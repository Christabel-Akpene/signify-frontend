import { db } from "@/services/firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: "basics" | "greetings" | "family" | "daily";
  order: number;
  icon: string;
  videoUrl?: string;
  signs: string[]; // Array of sign IDs that belong to this lesson
  createdAt: string;
}

export interface StudentProgress {
  studentId: string;
  lessonId: string;
  progress: number; // 0-100
  completed: boolean;
  starsEarned: number; // 0-3
  lastAccessed: string;
  attempts: number;
  correctSigns: string[]; // Array of sign IDs the student got correct
  incorrectSigns: string[]; // Array of sign IDs the student needs to practice
}

// Initialize lessons (call this once to populate your database)
export const initializeLessons = async () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Add the "Spell Your Name" lesson as the first lesson
  const spellNameLesson: Lesson = {
    id: "lesson-spell-name",
    title: "Spell Your Name",
    description: "Practice spelling your own name using the GSL alphabet.",
    category: "basics",
    order: 0,
    icon: "✍️",
    signs: alphabet,
    createdAt: new Date().toISOString(),
  };

  // Split alphabet into chunks of 5 letters each
  const chunkSize = 5;
  const chunks = [];
  for (let i = 0; i < alphabet.length; i += chunkSize) {
    chunks.push(alphabet.slice(i, i + chunkSize));
  }

  const lessons: Lesson[] = [
    spellNameLesson,
    ...chunks.map((signs, index) => {
      const start = index * 5 + 1;
      const end = start + signs.length - 1;

      return {
        id: `lesson-${index + 1}`,
        title: `The GSL Alphabet ${start}–${end}`,
        description: "Learn the foundational GSL alphabet handshapes.",
        category: "basics" as const,
        order: index + 1,
        icon: "語",
        signs,
        createdAt: new Date().toISOString(),
      };
    }),
  ];

  try {
    for (const lesson of lessons) {
      await setDoc(doc(db, "lessons", lesson.id), lesson);
    }
    console.log("Lessons initialized successfully");
  } catch (error) {
    console.error("Error initializing lessons:", error);
    throw error;
  }
};

// Get all lessons
export const getAllLessons = async (): Promise<Lesson[]> => {
  try {
    const lessonsSnapshot = await getDocs(collection(db, "lessons"));
    return lessonsSnapshot.docs.map((doc) => doc.data() as Lesson);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    throw error;
  }
};

// Get lessons by category
export const getLessonsByCategory = async (
  category: string
): Promise<Lesson[]> => {
  try {
    const lessonsQuery = query(
      collection(db, "lessons"),
      where("category", "==", category)
    );
    const lessonsSnapshot = await getDocs(lessonsQuery);
    return lessonsSnapshot.docs.map((doc) => doc.data() as Lesson);
  } catch (error) {
    console.error("Error fetching lessons by category:", error);
    throw error;
  }
};

// Get student progress for a specific lesson
export const getStudentLessonProgress = async (
  studentId: string,
  lessonId: string
): Promise<StudentProgress | null> => {
  try {
    const progressDoc = await getDoc(
      doc(db, "studentProgress", `${studentId}_${lessonId}`)
    );
    return progressDoc.exists()
      ? (progressDoc.data() as StudentProgress)
      : null;
  } catch (error) {
    console.error("Error fetching student progress:", error);
    throw error;
  }
};

// Get all progress for a student
export const getAllStudentProgress = async (
  studentId: string
): Promise<StudentProgress[]> => {
  try {
    const progressQuery = query(
      collection(db, "studentProgress"),
      where("studentId", "==", studentId)
    );
    const progressSnapshot = await getDocs(progressQuery);
    return progressSnapshot.docs.map((doc) => doc.data() as StudentProgress);
  } catch (error) {
    console.error("Error fetching all student progress:", error);
    throw error;
  }
};

// Update student progress
export const updateStudentProgress = async (
  studentId: string,
  lessonId: string,
  progressData: Partial<StudentProgress>
) => {
  try {
    const progressId = `${studentId}_${lessonId}`;
    const progressRef = doc(db, "studentProgress", progressId);

    const existingProgress = await getDoc(progressRef);

    if (existingProgress.exists()) {
      // Update existing progress
      await updateDoc(progressRef, {
        ...progressData,
        lastAccessed: new Date().toISOString(),
        attempts: increment(1),
      });
    } else {
      // Create new progress record
      await setDoc(progressRef, {
        studentId,
        lessonId,
        progress: 0,
        completed: false,
        starsEarned: 0,
        attempts: 1,
        correctSigns: [],
        incorrectSigns: [],
        lastAccessed: new Date().toISOString(),
        ...progressData,
      });
    }

    console.log("Progress updated successfully");
  } catch (error) {
    console.error("Error updating student progress:", error);
    throw error;
  }
};

// Mark lesson as completed
export const completLesson = async (
  studentId: string,
  lessonId: string,
  starsEarned: number
) => {
  try {
    await updateStudentProgress(studentId, lessonId, {
      completed: true,
      progress: 100,
      starsEarned,
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
};

// Get student's overall statistics
export const getStudentStats = async (studentId: string) => {
  try {
    const allProgress = await getAllStudentProgress(studentId);
    const totalLessons = (await getAllLessons()).length;
    const completedLessons = allProgress.filter((p) => p.completed).length;
    const totalStars = allProgress.reduce((sum, p) => sum + p.starsEarned, 0);
    const overallProgress =
      allProgress.length > 0
        ? allProgress.reduce((sum, p) => sum + p.progress, 0) /
          allProgress.length
        : 0;

    return {
      totalLessons,
      completedLessons,
      totalStars,
      overallProgress: Math.round(overallProgress),
      lessonsInProgress: allProgress.filter(
        (p) => p.progress > 0 && !p.completed
      ).length,
    };
  } catch (error) {
    console.error("Error fetching student stats:", error);
    throw error;
  }
};

// Helper function to get the name spelling lesson
export const getNameSpellingLesson = async (): Promise<Lesson | null> => {
  try {
    const lessonDoc = await getDoc(doc(db, "lessons", "lesson-spell-name"));
    return lessonDoc.exists() ? (lessonDoc.data() as Lesson) : null;
  } catch (error) {
    console.error("Error fetching name spelling lesson:", error);
    throw error;
  }
};

// Generate sign sequence for a name
export const getNameSignSequence = (name: string): string[] => {
  return name
    .toUpperCase()
    .split("")
    .filter((char) => /[A-Z]/.test(char)); // Only keep letters
};

initializeLessons();
