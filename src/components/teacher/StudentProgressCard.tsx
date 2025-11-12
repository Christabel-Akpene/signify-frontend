// components/ui/student-progress-card.tsx
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StudentProgressCardProps {
  name: string;
  progress: number;
  status: "on-track" | "struggling" | "not-started";
}

export const StudentProgressCard = ({
  name,
  progress,
  status,
}: StudentProgressCardProps) => {
  const statusStyles = {
    "on-track": {
      bg: "bg-secondary/30",
      text: "text-secondary-dark",
      progress: "[&>div]:bg-secondary",
      label: "On Track",
    },
    struggling: {
      bg: "bg-primary/30",
      text: "text-primary-dark",
      progress: "[&>div]:bg-primary",
      label: "Struggling",
    },
    "not-started": {
      bg: "bg-secondarytext/30",
      text: "text-textColor",
      progress: "[&>div]:bg-gray-300",
      label: "Not Started",
    },
  }[status];

  return (
    <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4 flex items-center justify-between space-x-4">
      <div className="flex flex-col space-y-2 flex-2">
        <div className="flex justify-between items-center">
          <p>{name}</p>
          <p>{progress}%</p>
        </div>
        <Progress value={progress} className={statusStyles.progress} />
      </div>

      <p
        className={cn(
          "text-sm font-bold text-center p-1 rounded-md flex-1",
          statusStyles.bg,
          statusStyles.text
        )}
      >
        {statusStyles.label}
      </p>
    </div>
  );
};
