import { auth, db } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

interface IndividualSignupData {
  username: string;
  email: string;
  level: "beginner" | "intermediate" | "advanced";
  password: string;
}

interface IndividualLoginData {
  email: string;
  password: string;
}

export const signUpIndividual = async ({
  individualData,
}: {
  individualData: IndividualSignupData;
}) => {
  try {
    // Creating firebase user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      individualData.email,
      individualData.password
    );
    const user = userCredential.user;
    const individualCode = "IND-" + nanoid(5).toUpperCase();

    // Store data inside firestore
    await setDoc(doc(db, "individuals", user.uid), {
      uid: user.uid,
      individualCode: individualCode,
      username: individualData.username,
      email: individualData.email,
      level: individualData.level,
      role: "individual",
      createdAt: new Date().toISOString(),
    });

    console.log("Individual user created successfully");
  } catch (error: any) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};

export const loginIndividual = async ({
  loginData,
}: {
  loginData: IndividualLoginData;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );

    const userDoc = await getDoc(
      doc(db, "individuals", userCredential.user.uid)
    );

    if (!userDoc.exists() || userDoc.data()?.role !== "individual") {
      await auth.signOut();
      throw new Error("Access denied. Not an individual account.");
    }

    return userDoc.data();
  } catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
