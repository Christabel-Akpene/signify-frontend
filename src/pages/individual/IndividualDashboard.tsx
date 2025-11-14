import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { BookOpen, TrendingUp, Award, Video, Loader2 } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { useEffect, useState } from "react";
import { getAllStudentProgress, getAllLessons } from "@/api/lessons";

interface DashboardStats {
  lessonsCompleted: number;
  currentStreak: number;
  averageScore: number;
  signsLearned: number;
  totalLessons: number;
}

interface CategoryProgress {
  category: string;
  progress: number;
}

interface RecentActivity {
  title: string;
  time: string;
  icon: typeof Award | typeof BookOpen | typeof Video;
  color: string;
}

const IndividualDashboard = () => {
  const { userData } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    lessonsCompleted: 0,
    currentStreak: 0,
    averageScore: 0,
    signsLearned: 0,
    totalLessons: 0,
  });
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>(
    []
  );
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userData?.uid) return;

      try {
        setLoading(true);
        const [allProgress, allLessons] = await Promise.all([
          getAllStudentProgress(userData.uid),
          getAllLessons(),
        ]);

        // Calculate stats
        const completedLessons = allProgress.filter((p) => p.completed).length;
        const totalStars = allProgress.reduce(
          (sum, p) => sum + p.starsEarned,
          0
        );
        const maxPossibleStars = completedLessons * 3;
        const averageScore =
          maxPossibleStars > 0
            ? Math.round((totalStars / maxPossibleStars) * 100)
            : 0;

        // Calculate signs learned (each lesson has signs, count unique completed signs)
        const signsLearned = allProgress
          .filter((p) => p.completed)
          .reduce((sum, p) => sum + p.correctSigns.length, 0);

        // Calculate streak (simplified - based on recent activity)
        const sortedProgress = allProgress
          .filter((p) => p.lastAccessed)
          .sort(
            (a, b) =>
              new Date(b.lastAccessed).getTime() -
              new Date(a.lastAccessed).getTime()
          );

        let currentStreak = 0;
        if (sortedProgress.length > 0) {
          const today = new Date();
          const lastActivity = new Date(sortedProgress[0].lastAccessed);
          const daysDiff = Math.floor(
            (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysDiff <= 1) {
            currentStreak = 1;
            // Count consecutive days
            for (let i = 1; i < sortedProgress.length; i++) {
              const prevDate = new Date(sortedProgress[i - 1].lastAccessed);
              const currDate = new Date(sortedProgress[i].lastAccessed);
              const diff = Math.floor(
                (prevDate.getTime() - currDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              if (diff <= 1) {
                currentStreak++;
              } else {
                break;
              }
            }
          }
        }

        setStats({
          lessonsCompleted: completedLessons,
          currentStreak,
          averageScore,
          signsLearned,
          totalLessons: allLessons.length,
        });

        // Calculate category progress
        const lessonsByCategory = allLessons.reduce((acc, lesson) => {
          if (!acc[lesson.category]) {
            acc[lesson.category] = { total: 0, completed: 0 };
          }
          acc[lesson.category].total++;

          const progress = allProgress.find((p) => p.lessonId === lesson.id);
          if (progress?.completed) {
            acc[lesson.category].completed++;
          }
          return acc;
        }, {} as Record<string, { total: number; completed: number }>);

        const categoryProgressData: CategoryProgress[] = Object.entries(
          lessonsByCategory
        ).map(([category, data]) => ({
          category: category.charAt(0).toUpperCase() + category.slice(1),
          progress: Math.round((data.completed / data.total) * 100),
        }));

        setCategoryProgress(categoryProgressData);

        // Generate recent activities
        const recentActivityData: RecentActivity[] = sortedProgress
          .slice(0, 3)
          .map((progress, index) => {
            const lesson = allLessons.find((l) => l.id === progress.lessonId);
            const timeDiff =
              Date.now() - new Date(progress.lastAccessed).getTime();
            const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
            const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            let timeString = "Just now";
            if (daysAgo > 0) {
              timeString = daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;
            } else if (hoursAgo > 0) {
              timeString = `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
            }

            const activityTypes = [
              {
                title: `Completed ${lesson?.title || "Lesson"}`,
                icon: Award,
                color: "bg-green-100 text-green-600",
              },
              {
                title: `Practiced ${lesson?.title || "Lesson"}`,
                icon: BookOpen,
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: `Reviewed ${lesson?.title || "Signs"}`,
                icon: Video,
                color: "bg-purple-100 text-purple-600",
              },
            ];

            const activityType = progress.completed
              ? activityTypes[0]
              : activityTypes[(index % 2) + 1];

            return {
              title: activityType.title,
              time: timeString,
              icon: activityType.icon,
              color: activityType.color,
            };
          });

        setRecentActivities(recentActivityData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userData?.uid]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bgColor px-4 py-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-textColor mb-2">
            Welcome back, {userData?.fullName || userData?.username}! 👋
          </h1>
          <p className="text-secondarytext">
            Continue your sign language learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Lessons Completed"
            total={`${stats.lessonsCompleted}/${stats.totalLessons}`}
            variant="default"
          />
          <StatCard
            title="Current Streak"
            total={`${stats.currentStreak} day${
              stats.currentStreak !== 1 ? "s" : ""
            }`}
            variant="default"
          />
          <StatCard
            title="Average Score"
            total={`${stats.averageScore}%`}
            variant="default"
          />
          <StatCard
            title="Signs Learned"
            total={stats.signsLearned.toString()}
            variant="default"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-textColor mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer group border border-border">
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
          <Card className="p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-textColor">
                Your Progress
              </h2>
            </div>
            <div className="space-y-4">
              {categoryProgress.length > 0 ? (
                categoryProgress.map((category) => {
                  const getProgressColor = (progress: number) => {
                    if (progress >= 80) return "bg-green-500";
                    if (progress >= 50) return "bg-blue-500";
                    if (progress >= 20) return "bg-amber-500";
                    return "bg-red-500";
                  };

                  return (
                    <div key={category.category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-secondarytext">
                          {category.category}
                        </span>
                        <span className="text-sm font-semibold text-textColor">
                          {category.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getProgressColor(
                            category.progress
                          )} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${category.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondarytext">
                    Start learning to see your progress here!
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <h2 className="text-xl font-semibold text-textColor mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 ${
                      index < recentActivities.length - 1 ? "pb-4 border-b" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}
                    >
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-textColor">
                        {activity.title}
                      </p>
                      <p className="text-xs text-secondarytext">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondarytext">
                    No recent activity. Start learning to see your progress!
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndividualDashboard;
