import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFriendlyAuthErrorMessage } from "@/lib/firebaseErrorMessages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signUpStudent } from "@/api/student";

const studentSignupSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .toLowerCase(),
});

type StudentSignupFields = z.infer<typeof studentSignupSchema>;

interface AddStudentDialogProps {
  teacherCode: string;
  onStudentAdded?: () => void;
}

export function AddStudentDialog({
  teacherCode,
  onStudentAdded,
}: AddStudentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentSignupFields>({
    resolver: zodResolver(studentSignupSchema),
  });

  const onSubmit: SubmitHandler<StudentSignupFields> = async (data) => {
    try {
      setIsLoading(true);
      setApiError("");

      // Add the teacher code to the data
      const studentData = {
        ...data,
        teacherCode,
      };

      console.log("Adding student:", studentData);
      await signUpStudent({ studentData });

      // Close dialog and reset form
      setOpen(false);
      reset();

      // Notify parent component
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error: any) {
      console.error("Add student error:", error);

      if (error.code) {
        setApiError(getFriendlyAuthErrorMessage(error));
      } else if (error.message) {
        setApiError(error.message);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form and errors when dialog closes
      reset();
      setApiError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Student</DialogTitle>
          <DialogDescription>
            Create a new student account for your classroom
          </DialogDescription>
        </DialogHeader>

        {/* API Error Alert */}
        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="fullname" className="text-sm sm:text-base">
              Full Name
            </Label>
            <Input
              {...register("fullname")}
              type="text"
              id="fullname"
              placeholder="Enter student's full name"
              className="h-12 text-base"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          {/* Username Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username" className="text-sm sm:text-base">
              Username
            </Label>
            <Input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Choose a username (e.g., john_doe)"
              className="h-12 text-base lowercase"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-secondarytext">
            <p className="font-semibold text-textColor mb-1">
              💡 Student Login Info
            </p>
            <p>
              The student will use their{" "}
              <span className="font-semibold">username</span> and{" "}
              <span className="font-semibold">
                your teacher code ({teacherCode})
              </span>{" "}
              to log in.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
