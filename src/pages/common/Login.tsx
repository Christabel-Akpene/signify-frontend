import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { auth } from "@/services/firebase";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type loginFields = z.infer<typeof loginSchema>;

const TeacherSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginFields> = (data) => {
    console.log(data);
    navigate("");
  };

  return (
    <div className="min-h-dvh bg-bgColor px-6 py-8">
      <button
        onClick={() => navigate("/roles")}
        className="self-start mb-6 p-2 hover:bg-primary/10 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-textColor" />
      </button>
      <h1 className="text-3xl font-bold text-textColor mb-2">SignIn</h1>
      <p className="text-secondarytext mb-8">Input your details to sign in</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="username">Username</Label>
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

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
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
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-xl cursor-pointer"
        >
          Signup
        </Button>
        
      </form>
            <p className="text-center text-sm my-4">
        Don't have an account?
        <Link to="/signup" className="text-primary hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default TeacherSignup;
