import { useAuth } from "@/contexts/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";

const TeacherDashboard = () => {
  const { userData } = useAuth();
  const { handleLogout } = useAuthActions();

  return (
    <div className="min-h-screen bg-bgColor p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-textColor">
              Welcome, {userData?.fullName || "Teacher"}!
            </h1>
            <p className="text-secondarytext mt-2">
              Teacher Code: {userData?.teacherCode}
            </p>
            <p className="text-secondarytext">School: {userData?.school}</p>
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
            Assistive Teaching Tools
          </h2>
          <p className="text-secondarytext">
            Access AI-powered tools to support learners with non-standard speech
            patterns and communication difficulties. Manage your students and
            track their progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
