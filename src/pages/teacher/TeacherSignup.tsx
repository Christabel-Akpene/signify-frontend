import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { signUpTeacher } from "@/api/teacher";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFriendlyAuthErrorMessage } from "@/lib/firebaseErrorMessages";
import BackButton from "@/components/common/BackButton";

const teacherSignupSchema = z
  .object({
    fullname: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.email("Please enter a valid email address"),
    school: z.string().min(3, "School name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type teacherSignupFields = z.infer<typeof teacherSignupSchema>;

const TeacherSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<teacherSignupFields>({
    resolver: zodResolver(teacherSignupSchema),
  });

  const onSubmit: SubmitHandler<teacherSignupFields> = async (data) => {
    try {
      setIsLoading(true);
      setApiError(""); // Clear previous errors
      console.log("Form Data:", data);
      await signUpTeacher({ teacherData: data });
      navigate("/teacher/teacherDashboard");
    } catch (error: any) {
      console.error("Signup error:", error);

      // Handle Firebase auth errors (which have a 'code' property)
      if (error.code) {
        setApiError(getFriendlyAuthErrorMessage(error));
      }
      // Handle API response errors
      else if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      }
      // Handle other errors with a message property
      else if (error.message) {
        setApiError(error.message);
      }
      // Fallback for unknown errors
      else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-bgColor flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-6 py-8">
        <BackButton />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-textColor">
            Create Your Teacher Account
          </h1>
          <p className="text-secondarytext text-sm sm:text-base">
            Join Hestia Signify and empower learners with speech difficulties
            through AI-powered assistive technology
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name Field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="fullname" className="text-sm sm:text-base">
                Full Name
              </Label>
              <Input
                {...register("fullname")}
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter your full name"
                className="h-12 sm:h-14 text-base"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email Address
              </Label>
              <Input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                placeholder="your.email@example.com"
                className="h-12 sm:h-14 text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* School Name Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="school" className="text-sm sm:text-base">
              School Name
            </Label>
            <Input
              {...register("school")}
              type="text"
              name="school"
              id="school"
              placeholder="Enter your school or institution name"
              className="h-12 sm:h-14 text-base"
            />
            {errors.school && (
              <p className="text-red-500 text-sm">{errors.school.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Password Field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">
                Password
              </Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Create a password"
                  className="h-12 sm:h-14 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondarytext hover:text-textColor transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="confirmpassword" className="text-sm sm:text-base">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  {...register("confirmpassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="Re-enter your password"
                  className="h-12 sm:h-14 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondarytext hover:text-textColor transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmpassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 sm:py-7 text-base sm:text-lg rounded-xl cursor-pointer transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm sm:text-base text-secondarytext">
          Already have an account?{" "}
          <Link
            to="/teacher/teacherLogin"
            className="text-primary hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherSignup;
