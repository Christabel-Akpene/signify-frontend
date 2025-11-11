import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const studentSignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  teacherCode: z
    .string()
    .length(6, "Teacher code must be 6 digits")
    .regex(/^\d+$/, "Teacher code must contain only numbers"),
});

type studentSignupFields = z.infer<typeof studentSignupSchema>;

const StudentSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<studentSignupFields>({
    resolver: zodResolver(studentSignupSchema),
  });

  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Update the form value
    const combinedOtp = newOtp.join("");
    setValue("teacherCode", combinedOtp, { shouldValidate: true });

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      const emptyIndex = otp.indexOf("");
      if (emptyIndex !== -1) {
        inputRefs.current[emptyIndex]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    setValue("teacherCode", pastedData, { shouldValidate: true });

    const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const onSubmit: SubmitHandler<studentSignupFields> = (data) => {
    console.log("Username:", data.username);
    console.log("Teacher Code:", data.teacherCode);

    navigate("/student/studentSignName");
  };

  return (
    <div className="min-h-dvh bg-bgColor px-6 py-8">
      <button
        onClick={() => navigate("/roles")}
        className="self-start mb-6 p-2 hover:bg-primary/10 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-textColor" />
      </button>
      <div className="flex flex-col  items-center">
            <h1 className="text-3xl font-bold text-textColor mb-2">Sign Up</h1>
      <p className="text-secondarytext mb-8">
        Fill this form to create your profile
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="username" className="font-semibold text-lg py-2">
            Username
          </Label>
          <Input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <p className="text-secondarytext text-sm">
              Enter the unique code provided by your teacher
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                aria-label={`Teacher code digit ${index + 1} of ${length}`}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            ))}
          </div>

          {errors.teacherCode && (
            <p className="text-red-500 text-sm text-center">
              {errors.teacherCode.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-xl cursor-pointer"
        >
          Signup
        </Button>
      </form>
      </div>

    </div>
  );
};

export default StudentSignup;
