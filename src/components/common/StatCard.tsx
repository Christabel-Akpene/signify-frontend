import React from "react";

interface StatCardProps {
  title: string;
  value?: number;
  total: any;
  percentage?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  total,
  percentage,
  variant = "default",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          bg: "bg-emerald-900/30",
          border: "border-emerald-700/50",
          text: "text-emerald-400",
        };
      case "warning":
        return {
          bg: "bg-amber-900/30",
          border: "border-amber-700/50",
          text: "text-amber-400",
        };
      case "danger":
        return {
          bg: "bg-red-900/30",
          border: "border-red-700/50",
          text: "text-red-400",
        };
      default:
        return {
          bg: "bg-slate-800/50",
          border: "border-slate-700/50",
          text: "text-slate-300",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-lg p-6 `}
    >
      <div className="space-y-2">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-white text-4xl font-bold">
            {value ?? total}
          </span>
          {value !== undefined && (
            <span className="text-slate-400 text-2xl font-medium">
              /{total}
            </span>
          )}
        </div>
        <p className={`${styles.text} text-sm font-semibold`}>{percentage}</p>
      </div>
    </div>
  );
};

export default StatCard;
