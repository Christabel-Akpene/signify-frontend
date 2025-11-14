import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Search, User, Settings, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getLessonsByCategory,
  getAllStudentProgress,
  getStudentStats,
  type Lesson,
} from "@/api/lessons";
import { useNavigate } from "react-router";

interface LessonWithProgress extends Lesson {
  progress: number;
  completed: boolean;
  starsEarned: number;
}

export default function IndividualLessons() {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"basics" | "greetings" | "family" | "daily">(
    "basics"
  );
  const [lessons, setLessons] = useState<LessonWithProgress[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (userData?.uid) {
      loadLessonsAndProgress();
    }
  }, [userData, tab]);

  const loadLessonsAndProgress = async () => {
    if (!userData?.uid) return;

    try {
      setLoading(true);

      // Fetch lessons for the selected category
      const categoryLessons = await getLessonsByCategory(tab);

      // Fetch individual's progress for all lessons
      const individualProgress = await getAllStudentProgress(userData.uid);

      // Fetch overall stats
      const stats = await getStudentStats(userData.uid);
      setOverallProgress(stats.overallProgress);

      // Combine lessons with progress data
      const lessonsWithProgress: LessonWithProgress[] = categoryLessons.map(
        (lesson) => {
          const progress = individualProgress.find(
            (p) => p.lessonId === lesson.id
          );
          return {
            ...lesson,
            progress: progress?.progress || 0,
            completed: progress?.completed || false,
            starsEarned: progress?.starsEarned || 0,
          };
        }
      );

      // Sort by order
      lessonsWithProgress.sort((a, b) => a.order - b.order);

      setLessons(lessonsWithProgress);
    } catch (error) {
      console.error("Error loading lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLessonClick = (lessonId: string) => {
    navigate(`/individual/individualQuiz?lessonId=${lessonId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgColor text-textColor p-4 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Settings className="w-6 h-6 cursor-pointer" />
        <h1 className="text-xl font-bold">GSL Lessons</h1>
        <User
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/individual/individualProfile")}
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-secondarytext w-4 h-4" />
        <Input
          placeholder="Search for lessons or signs..."
          className="pl-10 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Progress Card */}
      <Card className="bg-white shadow-md">
        <CardContent className="pt-4 space-y-3">
          <div className="flex justify-between font-semibold text-sm">
            <span>Overall Progress</span>
            <span>{overallProgress}% Complete</span>
          </div>
          <Progress value={overallProgress} />
          <p className="text-primary text-sm font-medium">
            {overallProgress < 30
              ? "Great start! Keep practicing!"
              : overallProgress < 70
              ? "You're doing great, keep it up!"
              : "Amazing progress! You're almost there!"}
          </p>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as typeof tab)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 bg-white">
          <TabsTrigger value="basics">The Basics</TabsTrigger>
          <TabsTrigger value="greetings">Greetings</TabsTrigger>
          <TabsTrigger value="family">Family</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lessons List */}
      <div className="space-y-4 pb-20">
        {filteredLessons.length === 0 ? (
          <p className="text-center text-secondarytext py-8">
            No lessons found in this category
          </p>
        ) : (
          filteredLessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="bg-primary text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg shrink-0">
                    {lesson.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg">{lesson.title}</h2>
                    <p className="text-sm text-secondarytext">
                      {lesson.description}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 text-primary text-sm h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/individual/individualQuiz?lessonId=${lesson.id}`
                        );
                      }}
                    >
                      Practice with AI
                    </Button>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {lesson.completed ? (
                      <CheckCircle className="text-secondary w-6 h-6" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-secondarytext rounded-full opacity-60" />
                    )}
                    {lesson.starsEarned > 0 && (
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((star) => (
                          <span
                            key={star}
                            className={`text-xs ${
                              star <= lesson.starsEarned
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Progress value={lesson.progress} className="h-2" />
                <p className="text-xs text-secondarytext text-right">
                  {lesson.progress}% complete
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
