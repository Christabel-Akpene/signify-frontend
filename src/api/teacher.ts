import { auth, db } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { nanoid } from "nanoid";

interface TeacherSignupData {
  fullname: string;
  email: string;
  school: string;
  password: string;
}

interface TeacherLoginData {
  email: string;
  password: string;
}

export const signUpTeacher = async ({
  teacherData,
}: {
  teacherData: TeacherSignupData;
}) => {
  try {
    // Creating firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      teacherData.email,
      teacherData.password
    );
    const user = userCredential.user;
    const teacherCode = "TCHR-" + nanoid(5).toUpperCase();
    // Store data inside firestore
    await setDoc(doc(db, "teachers", user.uid), {
      uid: user.uid,
      teacherCode: teacherCode,
      fullName: teacherData.fullname,
      email: teacherData.email,
      school: teacherData.school,
      role: "teacher",
      createdAt: new Date().toISOString(),
    });
    console.log("Teacher created successfully");
  } catch (error: any) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

export const loginTeacher = async ({
  loginData,
}: {
  loginData: TeacherLoginData;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );

    const userDoc = await getDoc(doc(db, "teachers", userCredential.user.uid));

    if (!userDoc.exists() || userDoc.data()?.role !== "teacher") {
      await auth.signOut();
      throw new Error("Access denied. Not a teacher account.");
    }

    return userDoc.data();
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

export const getTeacherStudents = async (teacherId: string) => {
  try {
    // Query students collection where teacherId matches
    const studentsQuery = query(
      collection(db, "students"),
      where("teacherId", "==", teacherId)
    );

    const studentsSnapshot = await getDocs(studentsQuery);

    if (studentsSnapshot.empty) {
      return [];
    }

    // Map through documents and return student data with progress
    const students = await Promise.all(
      studentsSnapshot.docs.map(async (studentDoc) => {
        const studentData = {
          id: studentDoc.id,
          ...studentDoc.data(),
        };

        // Fetch all progress for this student
        const progressQuery = query(
          collection(db, "studentProgress"),
          where("studentId", "==", studentDoc.id)
        );
        const progressSnapshot = await getDocs(progressQuery);

        // Calculate overall progress
        let overallProgress = 0;
        if (!progressSnapshot.empty) {
          const progressData = progressSnapshot.docs.map((doc) => doc.data());
          const totalProgress = progressData.reduce(
            (sum, p) => sum + (p.progress || 0),
            0
          );
          overallProgress = Math.round(totalProgress / progressData.length);
        }

        return {
          ...studentData,
          progress: overallProgress,
        };
      })
    );

    return students;
  } catch (error: any) {
    console.error("Failed to fetch students:", error.message);
    throw error;
  }
};

export interface StudentProgressData {
  attempts: number;
  completed: boolean;
  correctSigns: string[];
  incorrectSigns: string[];
  lastAccessed: string;
  lessonId: string;
  progress: number;
  starsEarned: number;
  studentId: string;
}

export const getStudentDetails = async (studentId: string) => {
  try {
    // Fetch student document
    const studentDoc = await getDoc(doc(db, "students", studentId));

    if (!studentDoc.exists()) {
      throw new Error("Student not found");
    }

    const studentData = {
      id: studentDoc.id,
      ...studentDoc.data(),
    };

    // Fetch all progress for this student
    const progressQuery = query(
      collection(db, "studentProgress"),
      where("studentId", "==", studentId)
    );
    const progressSnapshot = await getDocs(progressQuery);

    const progressData: StudentProgressData[] = progressSnapshot.docs.map(
      (doc) => doc.data() as StudentProgressData
    );

    // Calculate overall stats
    let overallProgress = 0;
    let completedLessons = 0;
    let totalStars = 0;
    const allIncorrectSigns = new Set<string>();

    if (progressData.length > 0) {
      const totalProgress = progressData.reduce((sum, p) => {
        if (p.completed) completedLessons++;
        totalStars += p.starsEarned || 0;
        p.incorrectSigns?.forEach((sign) => allIncorrectSigns.add(sign));
        return sum + (p.progress || 0);
      }, 0);
      overallProgress = Math.round(totalProgress / progressData.length);
    }

    return {
      student: studentData,
      progress: progressData,
      stats: {
        overallProgress,
        completedLessons,
        totalLessons: progressData.length,
        totalStars,
        problemSigns: Array.from(allIncorrectSigns),
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch student details:", error.message);
    throw error;
  }
};
