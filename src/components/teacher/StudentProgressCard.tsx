// components/ui/student-progress-card.tsx
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface StudentProgressCardProps {
  name: string;
  progress: number;
  status: "on-track" | "struggling" | "not-started";
}

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed};`;

export const StudentProgressCard = ({
  name,
  progress,
  status,
}: StudentProgressCardProps) => {
  const statusStyles = {
    "on-track": {
      dot: "bg-green-500",
      progress: "[&>div]:bg-green-500",
      label: "On Track",
    },
    struggling: {
      dot: "bg-amber-500",
      progress: "[&>div]:bg-amber-500",
      label: "Struggling",
    },
    "not-started": {
      dot: "bg-gray-400",
      progress: "[&>div]:bg-gray-400",
      label: "Not Started",
    },
  }[status];

  return (
    <Link to={"/teacher/teacherStudents/:student"}>
      <div className="group relative p-5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 mb-3">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 shrink-0">
            <img
              src={avatar("student")}
              alt={name}
              className="rounded-full w-full h-full object-cover ring-2 ring-gray-100"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 truncate">{name}</h3>
              <span className="text-sm font-semibold text-gray-600 ml-2">
                {progress}%
              </span>
            </div>
            <Progress
              value={progress}
              className={cn("h-1.5", statusStyles.progress)}
            />
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <div className={cn("w-2 h-2 rounded-full", statusStyles.dot)} />
            <span className="text-xs font-medium text-gray-600 hidden sm:inline">
              {statusStyles.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
