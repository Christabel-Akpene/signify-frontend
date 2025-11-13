import type { LucideIcon } from "lucide-react";

interface NavigationButtonProps {
  icon: LucideIcon;
  name: string;
  isActive?: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon: Icon,
  name,
  isActive = false,
}) => (
  <div className="flex flex-col items-center space-y-1 p-2 relative gap-0">
    <Icon
      className={`w-5 h-5 ${isActive ? "text-gray-800" : "text-gray-400"}`}
    />
    <span
      className={`text-xs ${
        isActive ? "text-gray-800 font-medium" : "text-gray-400"
      }`}
    >
      {name}
    </span>
    {isActive && (
      <div className="w-6 h-1 bg-gray-800 rounded-full absolute -bottom-1"></div>
    )}
  </div>
);

export default NavigationButton;
