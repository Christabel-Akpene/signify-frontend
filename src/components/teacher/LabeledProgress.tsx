// components/ui/labeled-progress.tsx
import { Progress } from "@/components/ui/progress";

interface LabeledProgressProps {
  label: string;
  value: number;
}

export const LabeledProgress = ({
  label,
  value,
}: LabeledProgressProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="w-32 text-textColor">{label}</p>
      <Progress value={value} className="[&>div]:bg-blue-500" />
    </div>
  );
};
