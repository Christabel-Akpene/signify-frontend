import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { BookOpen, TrendingUp, Award, Video } from "lucide-react";
import StatCard from "@/components/common/StatCard";

const IndividualDashboard = () => {
  const { userData } = useAuth();

  const quickActions = [
    {
      title: "Practice Lessons",
      description: "Learn new signs and improve your skills",
      icon: BookOpen,
      link: "/individual/individualLessons",
      color: "bg-blue-500",
    },
    {
      title: "Take Quiz",
      description: "Test your knowledge and track progress",
      icon: Award,
      link: "/individual/individualQuiz",
      color: "bg-green-500",
    },
    {
      title: "Sign Your Name",
      description: "Practice signing your name",
      icon: Video,
      link: "/individual/individualSignName",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-dvh bg-bgColor px-4 py-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-textColor mb-2">
            Welcome back, {userData?.fullName || "Learner"}! 👋
          </h1>
          <p className="text-secondarytext">
            Continue your sign language learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Lessons Completed" total="12" variant="default" />
          <StatCard title="Current Streak" total="5 days" variant="default" />
          <StatCard title="Quiz Score" total="85%" variant="default" />
          <StatCard title="Signs Learned" total="45" variant="default" />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-textColor mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div
                      className={`${action.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-textColor mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-secondarytext">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-textColor">
                Your Progress
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondarytext">
                    Alphabets
                  </span>
                  <span className="text-sm font-semibold text-textColor">
                    100%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondarytext">
                    Numbers
                  </span>
                  <span className="text-sm font-semibold text-textColor">
                    65%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-secondarytext">
                    Colors
                  </span>
                  <span className="text-sm font-semibold text-textColor">
                    30%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-textColor mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-textColor">
                    Completed Alphabet Quiz
                  </p>
                  <p className="text-xs text-secondarytext">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-textColor">
                    Practiced Numbers
                  </p>
                  <p className="text-xs text-secondarytext">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Video className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-textColor">
                    Signed Your Name
                  </p>
                  <p className="text-xs text-secondarytext">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
