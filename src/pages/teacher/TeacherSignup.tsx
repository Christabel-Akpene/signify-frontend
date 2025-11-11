import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const teacherSignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    school: z.string().min(3, "Schoolname must be at least 3 characters"),
    level: z.enum(
      ["beginner", "intermediate", "advanced"],
      "Select your level"
    ),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<teacherSignupFields>({
    resolver: zodResolver(teacherSignupSchema),
  });

  const onSubmit: SubmitHandler<teacherSignupFields> = (data) => {
    console.log(data);
    navigate("/teacher/teacherDashboard");
  };

  return (
    <div className="min-h-dvh bg-bgColor px-6 py-8">
      <button
        onClick={() => navigate("/roles")}
        className="self-start mb-6 p-2 hover:bg-primary/10 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-textColor" />
      </button>
      <h1 className="text-3xl font-bold text-textColor mb-2 text-center">Signup</h1>
      <p className="text-secondarytext mb-4 text-center">
        Fill this form to create your profile
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="username"  className="text-lg">Username</Label>
          <Input
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="email"  className="text-lg">Email</Label>
          <Input
            {...register("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="school" className="text-lg">School Name: </Label>
          <Input
            {...register("school")}
            type="text"
            name="school"
            id="school"
            placeholder="Enter your school's name"
          />
          {errors.school && (
            <p className="text-red-500 text-sm">{errors.school.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="password" className="text-lg">Password</Label>
          <Input
            {...register("password")}
            type="text"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2 mb-4">
          <Label htmlFor="confirmpassword" className="text-lg">Confirm Password</Label>
          <Input
            {...register("confirmpassword")}
            type="text"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm password"
          />
          {errors.confirmpassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmpassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-xl cursor-pointer mt-4"
        >
          Signup
        </Button>
      </form>

      <p className="text-center text-md my-4">
        Already have an account?
        <Link to="/teacher/teacherLogin" className="text-primary hover:underline px-2">
          Login
        </Link>
      </p>
    </div>
  );
};

export default TeacherSignup;
