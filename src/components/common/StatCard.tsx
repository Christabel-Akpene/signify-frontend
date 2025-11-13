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
          bg: "bg-secondary/20",
          border: "border-secondary/50",
          text: "text-secondary",
        };
      case "warning":
        return {
          bg: "bg-accent/20",
          border: "border-accent/50",
          text: "text-accent",
        };
      case "danger":
        return {
          bg: "bg-destructive/20",
          border: "border-destructive/50",
          text: "text-destructive",
        };
      default:
        return {
          bg: "bg-card",
          border: "border-border",
          text: "text-muted-foreground",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-lg p-6 `}>
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-card-foreground text-4xl font-bold">
            {value ?? total}
          </span>
          {value !== undefined && (
            <span className="text-muted-foreground text-2xl font-medium">
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
