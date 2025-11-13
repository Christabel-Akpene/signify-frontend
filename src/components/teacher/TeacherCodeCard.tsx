import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeacherCodeCardProps {
  classroomName: string;
  teacherCode: string;
  onCopy?: () => void;
}

export const TeacherCodeCard = ({
  classroomName,
  teacherCode,
  onCopy,
}: TeacherCodeCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(teacherCode);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
      <div className="p-6">
        {/* Classroom Name */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-1">Classroom</p>
          <p className="text-base text-gray-900">{classroomName}</p>
        </div>

        {/* Teacher Code */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Your Teacher Code
          </p>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 rounded-lg">
            <p className="text-2xl font-bold tracking-wider text-white font-mono">
              {teacherCode}
            </p>
          </div>
        </div>

        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="w-full mt-2 border-gray-200"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
