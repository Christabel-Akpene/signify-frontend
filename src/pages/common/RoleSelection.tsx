import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bgColor flex flex-col px-6 py-8">
      <button
        onClick={() => navigate("/")}
        className="self-start mb-6 p-2 hover:bg-primary/10 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-textColor" />
      </button>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-textColor mb-2">I am a...</h1>
        <p className="text-secondarytext text-sm">
          Choose your role to personalize your experience
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-6 max-w-md mx-auto w-full">
        <button
          onClick={() => navigate("/student/studentSignup")}
          className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary active:scale-[0.98] overflow-hidden cursor-pointer"
        >
          <div className=" bg-primary/20 flex items-center justify-center p-6">
            <img
              src="/images/student.png"
              alt="Student illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="py-6">
            <p className="text-2xl font-bold text-textColor group-hover:text-primary transition-colors cursor-pointer">
              Student
            </p>
            <p className="text-sm text-secondarytext mt-1 px-4">
              Learn sign language at your own pace
            </p>
          </div>
        </button>

        <button onClick={() => navigate("/teacher/teacherLogin")} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary active:scale-[0.98] overflow-hidden cursor-pointer">
          <div className="bg-secondary/20 flex items-center justify-center p-6">
            <img
              src="/images/teacher.png"
              alt="Teacher illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="py-6">
            <p className="text-2xl font-bold text-textColor group-hover:text-secondary transition-colors">
              Teacher
            </p>
            <p className="text-sm text-secondarytext mt-1 px-4">
              Guide students in their learning journey
            </p>
          </div>
        </button>

        <button onClick={() => navigate("/individual/individualLogin")} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-dark active:scale-[0.98] overflow-hidden cursor-pointer">
          <div className="bg-accent/60 flex items-center justify-center p-6">
            <img
              src="/images/individual.png"
              alt="Individual learner illustration"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="py-6">
            <p className="text-2xl font-bold text-textColor group-hover:text-accent/60 transition-colors">
              Individual
            </p>
            <p className="text-sm text-secondarytext mt-1 px-4">
              Learn sign language at your own pace
            </p>
          </div>
        </button>
      </div>

      {/* <button
        onClick={() => navigate("/")}
        className="text-secondarytext text-sm underline mt-6 hover:text-textColor transition-colors cursor-pointer"
      >
        Go back
      </button> */}
    </div>
  );
};

export default RoleSelection;
