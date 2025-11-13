import { CircleCheck , GraduationCap, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPathCardProps {
  module: string;
  status: "Completed" | "In progress" | "Not started";
}

const LearningPathCard = ({ module, status }: LearningPathCardProps) => {
  const statusConfig = {
    Completed: {
      color: "text-green-600",
      Icon: CircleCheck ,
      label: "Completed",
    },
    "In progress": {
      color: "text-blue-600",
      Icon: GraduationCap,
      label: "In Progress",
    },
    "Not started": {
      color: "text-yellow-500",
      Icon: Circle,
      label: "Not Started",
    },
  } as const;

  const { color, Icon, label } = statusConfig[status];

  return (
    <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4 flex items-center justify-between space-x-4">
      <Icon className={cn(color)} />
      <p>{module}</p>
      <p className={cn("font-semibold text-sm p-1 rounded-md", color)}>
        {label}
      </p>
    </div>
  );
};

export default LearningPathCard;