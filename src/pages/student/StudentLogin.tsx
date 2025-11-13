import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { loginStudent } from "@/api/student";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFriendlyAuthErrorMessage } from "@/lib/firebaseErrorMessages";

const studentLoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .toLowerCase(),
  teacherCode: z
    .string()
    .length(5, "Teacher code must be exactly 5 characters")
    .regex(
      /^[A-Z0-9]{5}$/,
      "Teacher code must contain only letters and numbers"
    )
    .toUpperCase()
    .transform((val) => `TCHR-${val}`),
});

type StudentLoginFields = z.infer<typeof studentLoginSchema>;

const StudentLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentLoginFields>({
    resolver: zodResolver(studentLoginSchema),
  });

  const onSubmit: SubmitHandler<StudentLoginFields> = async (data) => {
    try {
      setIsLoading(true);
      setApiError("");
      console.log("Login Data:", data);
      await loginStudent({ loginData: data });
      navigate("/student/studentDashboard");
    } catch (error: any) {
      console.error("Login error:", error);

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

  return (
    <div className="min-h-dvh bg-bgColor flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6 py-8">
        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8">
          <button
            onClick={() => navigate("/roles")}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-textColor" />
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-textColor">
            Welcome Back!
          </h1>
          <p className="text-secondarytext text-sm sm:text-base">
            Access your learning materials and practice tools
          </p>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="username" className="text-sm sm:text-base">
              Username
            </Label>
            <Input
              {...register("username")}
              type="text"
              id="username"
              placeholder="Enter your username"
              className="h-12 sm:h-14 text-base lowercase"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Teacher Code Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="teacherCode" className="text-sm sm:text-base">
              Teacher Code
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-mono text-secondarytext">
                TCHR-
              </span>
              <Input
                {...register("teacherCode")}
                type="text"
                id="teacherCode"
                placeholder="XXXXX"
                maxLength={5}
                className="h-12 sm:h-14 text-base uppercase font-mono pl-18"
              />
            </div>
            <p className="text-xs text-secondarytext">
              Ask your teacher if you forgot this code
            </p>
            {errors.teacherCode && (
              <p className="text-red-500 text-sm">
                {errors.teacherCode.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 sm:py-7 text-base sm:text-lg rounded-xl cursor-pointer transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm sm:text-base text-secondarytext">
          Don't have an account?{" "}
          <Link
            to="/student/studentSignup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-secondarytext">
          <p className="font-semibold mb-1">🔑 Need help?</p>
          <p>
            Your teacher can help you with your login details. Contact them if
            you're having trouble accessing your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
