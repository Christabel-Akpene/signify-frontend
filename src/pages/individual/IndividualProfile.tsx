import { useAuth } from "@/contexts/AuthContext";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const IndividualProfile = () => {
  const { userData } = useAuth();
  const { handleLogout } = useAuthActions();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-bgColor px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/individual/individualDashboard")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-textColor">My Profile</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24 bg-primary text-white text-3xl">
              <AvatarFallback className="bg-primary text-white text-3xl">
                {userData?.fullName ? getInitials(userData.fullName) : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-textColor">
                {userData?.fullName || "User"}
              </h2>
              <p className="text-secondarytext">Independent Learner</p>
            </div>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondarytext">Username</p>
                <p className="text-lg font-semibold text-textColor">
                  {userData?.username || "N/A"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondarytext">Email</p>
                <p className="text-lg font-semibold text-textColor">
                  {userData?.email || "N/A"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-secondarytext">Role</p>
                <p className="text-lg font-semibold text-textColor">
                  {userData?.role
                    ? userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)
                    : "N/A"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-textColor mb-4">
            Learning Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-secondarytext">Lessons Completed</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-sm text-secondarytext">Average Score</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">45</p>
              <p className="text-sm text-secondarytext">Signs Learned</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">5</p>
              <p className="text-sm text-secondarytext">Day Streak</p>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full gap-2 text-red-600 border-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default IndividualProfile;
