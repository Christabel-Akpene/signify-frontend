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
import { loginIndividual } from "@/api/individual";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFriendlyAuthErrorMessage } from "@/lib/firebaseErrorMessages";
import BackButton from "@/components/common/BackButton";

const individualLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type individualLoginFields = z.infer<typeof individualLoginSchema>;

const IndividualLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<individualLoginFields>({
    resolver: zodResolver(individualLoginSchema),
  });

  const onSubmit: SubmitHandler<individualLoginFields> = async (data) => {
    try {
      setIsLoading(true);
      setApiError(""); // Clear previous errors
      console.log("Login Data:", data);
      await loginIndividual({ loginData: data });
      navigate("/individual/individualDashboard");
    } catch (error: any) {
      console.error("Login error:", error);

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
      <div className="w-full max-w-md space-y-6 py-8">
        <BackButton />

        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-textColor">
            Welcome Back
          </h1>
          <p className="text-secondarytext text-sm sm:text-base">
            An average adult Ghanaian speaks up to 3 languages. Why not add sign
            language to that stack?
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
                placeholder="Enter your password"
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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 sm:py-7 text-base sm:text-lg rounded-xl cursor-pointer transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm sm:text-base text-secondarytext">
          Don't have an account?{" "}
          <Link
            to="/individual/individualSignup"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default IndividualLogin;
