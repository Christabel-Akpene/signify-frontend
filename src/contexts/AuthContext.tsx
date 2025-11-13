import { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

interface UserData {
  uid: string;
  email: string;
  role: "teacher" | "student" | "individual";
  fullName?: string;
  username?: string;
  school?: string;
  teacherCode?: string;
  studentCode?: string;
  teacherId?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes - this persists across page refreshes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Try to fetch user data from different collections based on role
        try {
          // Check teachers collection
          let userDoc = await getDoc(doc(db, "teachers", user.uid));

          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          } else {
            // Check students collection
            userDoc = await getDoc(doc(db, "students", user.uid));

            if (userDoc.exists()) {
              setUserData(userDoc.data() as UserData);
            } else {
              // Check individuals collection
              userDoc = await getDoc(doc(db, "individuals", user.uid));

              if (userDoc.exists()) {
                setUserData(userDoc.data() as UserData);
              } else {
                console.error("User document not found in any collection");
                setUserData(null);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
