import { useState } from "react";
import { Book, Star, Lock, CheckCircle2 } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  status: "locked" | "available" | "in-progress" | "completed";
  stars: number;
}

const lessons: Lesson[] = [
  { id: 1, title: "THE ALPHABET", status: "completed", stars: 3 },
  { id: 2, title: "NUMERALS", status: "completed", stars: 3 },
  { id: 3, title: "COLORS", status: "in-progress", stars: 2 },
  {
    id: 4,
    title: "FAMILY, PEOPLE AND PRONOUNS",
    status: "available",
    stars: 0,
  },
  { id: 5, title: "GRAMMAR AND PARTS OF SPEECH", status: "locked", stars: 0 },
  { id: 6, title: "HOME AND CLOTHING", status: "locked", stars: 0 },
  { id: 7, title: "FOOD", status: "locked", stars: 0 },
  { id: 8, title: "ANIMALS", status: "locked", stars: 0 },
  { id: 9, title: "WORK", status: "locked", stars: 0 },
  { id: 10, title: "MONEY", status: "locked", stars: 0 },
  { id: 11, title: "OPPOSITES AND QUESTIONS", status: "locked", stars: 0 },
  { id: 12, title: "ACTIVITIES", status: "locked", stars: 0 },
  { id: 13, title: "SPORTS AND GAMES", status: "locked", stars: 0 },
  { id: 14, title: "SCIENCE AND NATURE", status: "locked", stars: 0 },
  { id: 15, title: "EDUCATION AND COMMUNICATION", status: "locked", stars: 0 },
  { id: 16, title: "HEALTH", status: "locked", stars: 0 },
  { id: 17, title: "IDEAS AND MENTAL ACTION", status: "locked", stars: 0 },
  { id: 18, title: "EMOTION AND CHARACTER", status: "locked", stars: 0 },
  { id: 19, title: "TIME", status: "locked", stars: 0 },
  { id: 20, title: "TRAVEL AND DIRECTIONS", status: "locked", stars: 0 },
  { id: 21, title: "TOWNS, REGIONS AND COUNTRIES", status: "locked", stars: 0 },
  { id: 22, title: "POLITICS", status: "locked", stars: 0 },
  { id: 23, title: "RELIGION", status: "locked", stars: 0 },
  { id: 24, title: "OCCASIONS", status: "locked", stars: 0 },
  { id: 25, title: "IDIOMATIC EXPRESSIONS", status: "locked", stars: 0 },
  { id: 26, title: "TECHNOLOGY", status: "locked", stars: 0 },
];

const StudentLessonPath = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getStatusColor = (status: Lesson["status"]) => {
    switch (status) {
      case "completed":
        return "bg-secondary border-secondary-dark";
      case "in-progress":
        return "bg-primary border-primary-dark";
      case "available":
        return "bg-accent border-primary-dark";
      case "locked":
        return "bg-gray-300 border-gray-400";
    }
  };

  const getStatusIcon = (lesson: Lesson) => {
    switch (lesson.status) {
      case "completed":
        return <CheckCircle2 className="w-8 h-8 text-white" />;
      case "in-progress":
        return <Book className="w-8 h-8 text-white" />;
      case "available":
        return <Star className="w-8 h-8 text-white" />;
      case "locked":
        return <Lock className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-bgColor pb-20">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 p-3 md:p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg md:text-2xl font-bold text-textColor">
            Sign Language Path
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔥</span>
              </div>
              <span className="font-bold text-textColor text-sm md:text-base">
                5
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-textColor text-sm md:text-base">
                2520
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Path */}
      <div className="max-w-2xl mx-auto px-6 md:px-4 pt-6 md:pt-8 relative">
        {/* Lessons */}
        <div className="relative space-y-8 md:space-y-12">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="relative"
              style={{
                marginLeft: index % 2 === 0 ? "0" : "auto",
                marginRight: index % 2 === 0 ? "auto" : "0",
                width: "fit-content",
              }}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Lesson Circle */}
                <button
                  onClick={() =>
                    lesson.status !== "locked" && setSelectedLesson(lesson)
                  }
                  disabled={lesson.status === "locked"}
                  className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-full border-b-[6px] border-4 flex items-center justify-center
                    transition-all duration-200 transform active:scale-95 active:translate-y-1 active:border-b-[3px] md:hover:scale-105 md:hover:-translate-y-0.5
                    ${getStatusColor(lesson.status)}
                    ${
                      lesson.status === "locked"
                        ? "cursor-not-allowed shadow-[0_4px_0_0_rgba(156,163,175,0.5)]"
                        : "cursor-pointer shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] md:hover:shadow-[0_8px_0_0_rgba(0,0,0,0.2)]"
                    }
                  `}
                  style={{
                    boxShadow:
                      lesson.status === "locked"
                        ? "0 4px 0 0 rgba(156, 163, 175, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15)"
                        : "0 6px 0 0 rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="scale-90 md:scale-100">
                    {getStatusIcon(lesson)}
                  </div>
                </button>

                {/* Stars */}
                {lesson.status !== "locked" && (
                  <div className="flex gap-1">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 md:w-4 md:h-4 ${
                          star <= lesson.stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Lesson Title */}
                <div className="text-center max-w-[140px] md:max-w-[200px]">
                  <p className="text-xs md:text-sm font-semibold text-textColor leading-tight">
                    {lesson.title}
                  </p>
                  {lesson.status === "locked" && (
                    <p className="text-[10px] md:text-xs text-secondarytext mt-1">
                      Complete previous
                    </p>
                  )}
                </div>

                {/* Special Milestone - Hidden on mobile for cleaner look */}
                {[5, 10, 15, 20, 25].includes(lesson.id) && (
                  <div className="hidden md:block absolute -right-16 top-1/2 transform -translate-y-1/2">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg border-4 border-b-[6px] border-yellow-500 flex items-center justify-center shadow-[0_6px_0_0_rgba(202,138,4,0.5),0_8px_16px_rgba(0,0,0,0.2)]">
                      <span className="text-2xl">🏆</span>
                    </div>
                  </div>
                )}

                {/* Trophy badge on mobile - positioned differently */}
                {[5, 10, 15, 20, 25].includes(lesson.id) && (
                  <div className="md:hidden absolute -top-2 -right-2">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-b-[3px] border-yellow-500 flex items-center justify-center shadow-[0_3px_0_0_rgba(202,138,4,0.5),0_4px_8px_rgba(0,0,0,0.2)]">
                      <span className="text-sm">🏆</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* End Banner */}
        <div className="mt-12 md:mt-16 text-center px-4">
          <div className="inline-block bg-linear-to-r from-primary to-secondary text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl shadow-xl">
            <p className="text-sm md:text-xl font-bold">
              Complete all lessons to master Sign Language!
            </p>
          </div>
        </div>
      </div>

      {/* Lesson Detail Modal/Bottom Sheet */}
      {selectedLesson && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-end md:items-center justify-center"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg p-5 md:p-6 transform transition-transform max-h-[85vh] md:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag indicator for mobile */}
            <div className="md:hidden w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-2">
                <h2 className="text-xl md:text-2xl font-bold text-textColor mb-2 leading-tight">
                  {selectedLesson.title}
                </h2>
                <div className="flex gap-1">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        star <= selectedLesson.stars
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-gray-400 hover:text-gray-600 active:text-gray-700 p-2 -m-2"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-bgColor rounded-xl p-4">
                <p className="text-sm md:text-base text-secondarytext">
                  Master essential sign language vocabulary and phrases for{" "}
                  {selectedLesson.title.toLowerCase()}.
                </p>
              </div>

              <button
                className="w-full bg-primary active:bg-primary-dark md:hover:bg-primary-dark text-white font-bold py-3.5 md:py-4 rounded-xl transition-all duration-200 text-base md:text-lg border-b-[5px] border-primary-dark active:border-b-2 active:translate-y-1 shadow-[0_5px_0_0_rgba(197,107,40,1),0_8px_16px_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_0_rgba(197,107,40,1),0_4px_8px_rgba(0,0,0,0.15)] md:hover:-translate-y-0.5 md:hover:shadow-[0_6px_0_0_rgba(197,107,40,1),0_10px_20px_rgba(0,0,0,0.25)]"
                onClick={() => {
                  // Navigate to lesson
                  console.log("Starting lesson:", selectedLesson.id);
                }}
              >
                {selectedLesson.status === "completed"
                  ? "Practice Again"
                  : "Start Lesson"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLessonPath;
