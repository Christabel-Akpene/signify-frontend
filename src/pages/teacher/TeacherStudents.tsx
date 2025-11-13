import { getTeacherStudents } from "@/api/teacher";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

interface Student {
  id: string;
  uid: string;
  studentCode: string;
  username: string;
  fullName: string;
  teacherId: string;
  teacherCode: string;
  role: string;
  createdAt: string;
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
        const fetchedStudents = await getTeacherStudents(userData.uid);
        setStudents(fetchedStudents as Student[]);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching students:", err);
        setError(err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userData?.uid]);

  if (loading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Students ({students.length})</h1>
      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.fullName} (@{student.username}) - {student.studentCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherStudents;
