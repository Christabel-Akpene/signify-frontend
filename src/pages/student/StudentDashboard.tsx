import { useAuth } from "@/contexts/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
const StudentDashboard = () => {
  const { userData } = useAuth();
  const { handleLogout } = useAuthActions();

  return (
    <div className="min-h-screen bg-bgColor p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-textColor">
              Welcome, {userData?.fullName || "Student"}!
            </h1>
            <p className="text-secondarytext mt-2">
              Username: {userData?.username}
            </p>
            <p className="text-secondarytext">
              Student Code: {userData?.studentCode}
            </p>
            <p className="text-secondarytext">
              Teacher Code: {userData?.teacherCode}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            Logout
          </Button>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-semibold text-textColor mb-4">
            My Learning Space
          </h2>
          <p className="text-secondarytext">
            Access your communication practice tools and learning materials
            assigned by your teacher.
          </p>
          <Link to={"/student/studentQuiz"}>Go to Quiz</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
