import { StudentProgressCard } from "@/components/teacher/StudentProgressCard";
import { useAuth } from "@/contexts/AuthContext";
import { getTeacherStudents } from "@/api/teacher";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  fullName: string;
  email: string;
  studentCode: string;
  teacherId: string;
  progress?: number;
  [key: string]: any;
}

const TeacherStudents = () => {
  const { userData } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!userData?.uid) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const studentsData = await getTeacherStudents(userData.uid);
        setStudents(studentsData as Student[]);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching students:", err);
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userData]);

  const getStatus = (progress: number = 0) => {
    if (progress === 0) return "not-started";
    if (progress < 50) return "struggling";
    return "on-track";
  };

  return (
    <div className="min-h-dvh bg-bgColor px-6 py-8">
      <h1 className="text-2xl text-center font-semibold mb-4">All Students</h1>

      <div>
        {loading && (
          <p className="text-center text-gray-500">Loading students...</p>
        )}

        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && students.length === 0 && (
          <p className="text-center text-gray-500">No students found</p>
        )}

        {!loading && !error && students.length > 0 && (
          <>
            {students.map((student) => (
              <StudentProgressCard
                key={student.id}
                name={student.fullName}
                progress={student.progress || 0}
                status={getStatus(student.progress)}
                studentId={student.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherStudents;
