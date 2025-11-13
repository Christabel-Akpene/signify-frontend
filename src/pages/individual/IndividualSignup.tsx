import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { signUpIndividual } from "@/api/individual";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFriendlyAuthErrorMessage } from "@/lib/firebaseErrorMessages";
import BackButton from "@/components/common/BackButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const individualSignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    level: z.enum(["beginner", "intermediate", "advanced"], {
      message: "Please select your skill level",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type individualSignupFields = z.infer<typeof individualSignupSchema>;

const IndividualSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<individualSignupFields>({
    resolver: zodResolver(individualSignupSchema),
  });

  const onSubmit: SubmitHandler<individualSignupFields> = async (data) => {
    try {
      setIsLoading(true);
      setApiError(""); // Clear previous errors
      console.log("Form Data:", data);
      await signUpIndividual({ individualData: data });
      navigate("/individual/individualSignName");
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
            Create Your Individual Account
          </h1>
          <p className="text-secondarytext text-sm sm:text-base">
            Join Hestia Signify and enhance your communication skills with
            AI-powered assistive technology
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
            {/* Username Field */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="username" className="text-sm sm:text-base">
                Username
              </Label>
              <Input
                {...register("username")}
                type="text"
                name="username"
                id="username"
                placeholder="Choose a username"
                className="h-12 sm:h-14 text-base"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
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

          {/* Level Field */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="level" className="text-sm sm:text-base">
              Skill Level
            </Label>
            <Controller
              name="level"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger id="level" className="h-12 sm:h-14 text-base">
                    <SelectValue placeholder="Select your current skill level" />
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectGroup>
                      <SelectLabel>Skill Levels</SelectLabel>
                      <SelectItem value="beginner">
                        Beginner - Just starting out
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate - Some experience
                      </SelectItem>
                      <SelectItem value="advanced">
                        Advanced - Highly experienced
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level.message}</p>
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
            to="/individual/individualLogin"
            className="text-primary hover:underline font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default IndividualSignup;
