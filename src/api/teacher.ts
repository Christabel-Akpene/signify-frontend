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

    // Map through documents and return student data
    const students = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return students;
  } catch (error: any) {
    console.error("Failed to fetch students:", error.message);
    throw error;
  }
};
