import { auth, db, secondaryAuth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { nanoid } from "nanoid";

interface StudentSignupData {
  fullname: string;
  username: string;
  teacherCode: string;
}

interface StudentLoginData {
  username: string;
  teacherCode: string;
}

export const signUpStudent = async ({
  studentData,
  preserveAuthState = false,
}: {
  studentData: StudentSignupData;
  preserveAuthState?: boolean;
}) => {
  try {
    // Validate that the teacher code exists
    const teachersQuery = query(
      collection(db, "teachers"),
      where("teacherCode", "==", studentData.teacherCode)
    );
    const teacherSnapshot = await getDocs(teachersQuery);

    if (teacherSnapshot.empty) {
      throw new Error("Invalid teacher code. Please check with your teacher.");
    }

    const teacherDoc = teacherSnapshot.docs[0];
    const teacherId = teacherDoc.id;

    // Check if username already exists for this teacher
    const studentsQuery = query(
      collection(db, "students"),
      where("username", "==", studentData.username.toLowerCase()),
      where("teacherId", "==", teacherId)
    );
    const studentSnapshot = await getDocs(studentsQuery);

    if (!studentSnapshot.empty) {
      throw new Error(
        "Username already taken by another student in this class."
      );
    }

    // Use secondary auth instance if preserving auth state (teacher adding student)
    // This prevents the teacher from being signed out
    const authInstance = preserveAuthState ? secondaryAuth : auth;

    // Create Firebase Auth user with generated email and teacher code as password
    const email = `${studentData.username.toLowerCase()}@signify.app`;
    const userCredential = await createUserWithEmailAndPassword(
      authInstance,
      email,
      studentData.teacherCode
    );
    const user = userCredential.user;

    // Generate unique student code
    const studentCode = "STD-" + nanoid(5).toUpperCase();

    // Store student data in Firestore
    await setDoc(doc(db, "students", user.uid), {
      uid: user.uid,
      studentCode: studentCode,
      username: studentData.username.toLowerCase(),
      fullName: studentData.fullname,
      teacherId: teacherId,
      teacherCode: studentData.teacherCode,
      role: "student",
      createdAt: new Date().toISOString(),
    });

    console.log("Student created successfully");

    return { success: true, user };
  } catch (error: any) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

export const loginStudent = async ({
  loginData,
}: {
  loginData: StudentLoginData;
}) => {
  try {
    // Convert username to email format
    const email = `${loginData.username.toLowerCase()}@signify.app`;

    // Sign in with username (as email) and teacher code (as password)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      loginData.teacherCode
    );

    // Verify user is a student
    const userDoc = await getDoc(doc(db, "students", userCredential.user.uid));

    if (!userDoc.exists() || userDoc.data()?.role !== "student") {
      await auth.signOut();
      throw new Error("Access denied. Not a student account.");
    }

    return userDoc.data();
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
