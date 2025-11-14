import Piechart from "@/components/teacher/Piechart";
// import { LabeledProgress } from "@/components/teacher/LabeledProgress";
import { StudentProgressCard } from "@/components/teacher/StudentProgressCard";
import StatCard from "@/components/common/StatCard";
import { TeacherCodeCard } from "@/components/teacher/TeacherCodeCard";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { getTeacherStudents } from "@/api/teacher";
import { AddStudentDialog } from "@/components/teacher/AddStudentDialog";

const TeacherDashboard = () => {
  const { userData } = useAuth();
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [studentStats, setStudentStats] = useState({
    struggling: 0,
    onTrack: 0,
    notStarted: 0,
  });

  const fetchStudents = async () => {
    if (!userData?.uid) return;

    try {
      setLoading(true);
      const students = await getTeacherStudents(userData.uid);
      console.log("Fetched students:", students);
      setStudents(students);
      setTotalStudents(students.length);

      // Calculate student progress stats
      const struggling = students.filter(
        (student: any) => student.progress > 0 && student.progress < 60
      ).length;
      const onTrack = students.filter(
        (student: any) => student.progress >= 60
      ).length;
      const notStarted = students.filter(
        (student: any) => !student.progress || student.progress === 0
      ).length;

      setStudentStats({ struggling, onTrack, notStarted });
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [userData?.uid]);

  return (
    <div className="min-h-dvh bg-bgColor px-4 py-4 md:px-6 lg:px-8 flex flex-col text-textColor max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold my-3 md:my-4">
        Welcome, {userData?.fullName || "Teacher"}
      </h1>
      <TeacherCodeCard
        classroomName={userData?.school || "N/A"}
        teacherCode={userData?.teacherCode || "N/A"}
        onCopy={() => console.log("Code copied!")}
      />

      {/* Stats Cards - Stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-2 gap-4 my-6">
        <StatCard
          title="Total Students"
          total={loading ? 0 : totalStudents}
          variant="default"
        />
        <StatCard title="Class Accuracy" total="82%" variant="default" />
      </div>

      <p className="text-lg md:text-xl font-bold mb-4">At a Glance Stats</p>

      {/* Stats Grid - Stack on mobile, side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="p-4 md:p-5 rounded-md bg-white shadow-md text-lg text-secondarytext">
          <p className="font-semibold text-lg md:text-xl mb-2">
            Student Progress
          </p>
          <Piechart
            struggling={studentStats.struggling}
            onTrack={studentStats.onTrack}
            notStarted={studentStats.notStarted}
          />
        </div>
      </div>

      <div className="flex items-center sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <p className="text-lg md:text-xl font-semibold">My Students</p>
        <AddStudentDialog
          teacherCode={userData?.teacherCode || ""}
          onStudentAdded={fetchStudents}
        />
      </div>

      {/* Students Grid - Better spacing on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.slice(0, 3).map((student) => {
          const progress = student.progress || 0;
          let status: "struggling" | "on-track" | "not-started" = "not-started";
          if (progress === 0) status = "not-started";
          else if (progress < 60) status = "struggling";
          else status = "on-track";

          return (
            <StudentProgressCard
              key={student.id}
              name={student.fullName}
              progress={progress}
              status={status}
              studentId={student.id}
            />
          );
        })}
      </div>
      {/* <div className="p-4 md:p-5 rounded-md bg-white shadow-md text-lg text-secondarytext">
        <p className="font-semibold text-lg md:text-xl mb-2">
          Top Missed Signs
        </p>
        <p className="text-sm md:text-base mb-3">Top 3 most missed signs</p>
        <LabeledProgress label="Hello" value={33} />
        <LabeledProgress label="Thank You" value={45} />
        <LabeledProgress label="Sorry" value={13} />
      </div> */}
    </div>
  );
};

export default TeacherDashboard;
