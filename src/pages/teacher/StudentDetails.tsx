import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import LearningPathCard from "@/components/teacher/LearningPathCard";
import StudentLineChart from "@/components/teacher/LineChart";
import { getStudentDetails } from "@/api/teacher";
import type { StudentProgressData } from "@/api/teacher";
import { getAllLessons } from "@/api/lessons";
import type { Lesson } from "@/api/lessons";

interface StudentData {
  fullName: string;
  username: string;
  studentCode: string;
  [key: string]: any;
}

interface StudentStats {
  overallProgress: number;
  completedLessons: number;
  totalLessons: number;
  totalStars: number;
  problemSigns: string[];
}

const StudentDetails = () => {
  const navigate = useNavigate();
  const { student } = useParams();

  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [progressData, setProgressData] = useState<StudentProgressData[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!student) return;

      try {
        setLoading(true);
        // Fetch student details and progress
        const details = await getStudentDetails(student);
        setStudentData(details.student as unknown as StudentData);
        setProgressData(details.progress);
        setStats(details.stats);

        // Fetch all lessons to map lesson IDs to titles
        const allLessons = await getAllLessons();
        setLessons(allLessons.sort((a, b) => a.order - b.order));

        setError(null);
      } catch (err: any) {
        console.error("Error fetching student data:", err);
        setError(err.message || "Failed to load student data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [student]);

  const getLessonStatus = (lessonId: string) => {
    const progress = progressData.find((p) => p.lessonId === lessonId);
    if (!progress) return "Not started";
    if (progress.completed) return "Completed";
    if (progress.progress > 0) return "In progress";
    return "Not started";
  };

  if (loading) {
    return (
      <div className="min-h-dvh bg-bgColor flex items-center justify-center">
        <p className="text-textColor">Loading student data...</p>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-dvh bg-bgColor flex flex-col items-center justify-center px-3">
        <p className="text-red-600 mb-4">{error || "Student not found"}</p>
        <button
          onClick={() => navigate("/teacher/teacherStudents")}
          className="text-blue-600 underline"
        >
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bgColor flex flex-col px-3 py-4">
      <div className="flex items-center">
        <button
          onClick={() => navigate("/teacher/teacherStudents")}
          className=""
        >
          <ArrowLeft className="w-6 h-6 text-textColor" />
        </button>
        <h1 className="text-2xl font-semibold mx-auto">
          {studentData.fullName}
        </h1>
      </div>

      <p className="text-lg font-bold my-4">Learning Path</p>

      <div className="mb-3 max-h-96 overflow-y-auto">
        {lessons.map((lesson) => (
          <LearningPathCard
            key={lesson.id}
            module={lesson.title}
            status={getLessonStatus(lesson.id)}
          />
        ))}
      </div>

      <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4">
        <p className="text-blue-600 font-semibold">Analytics</p>
        <p className="font-bold text-lg">Student Progress</p>
        <p className="text-sm mb-2">
          Overall Progress: {stats?.overallProgress || 0}% | Completed:{" "}
          {stats?.completedLessons || 0}/{stats?.totalLessons || 0} | Stars:{" "}
          {stats?.totalStars || 0}
        </p>
        <p className="text-sm mb-4">Student's score over the last week</p>
        <StudentLineChart />
      </div>

      <p className="text-lg font-bold mb-4">
        Problem Signs{" "}
        {stats?.problemSigns.length ? `(${stats.problemSigns.length})` : ""}
      </p>
      {stats?.problemSigns.length ? (
        <div className="grid grid-cols-2 gap-3">
          {stats.problemSigns.map((sign, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-md p-4 bg-white shadow-md text-2xl font-bold text-red-600"
            >
              {sign}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-md p-4 bg-white shadow-md text-secondarytext">
          No problem signs yet! 🎉
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
