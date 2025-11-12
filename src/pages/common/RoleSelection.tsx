import BackButton from "@/components/common/BackButton";
import RoleCard from "@/components/common/RoleCard";
import { useNavigate } from "react-router";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-bgColor flex flex-col px-6 py-8">
      <BackButton />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-textColor mb-2">I am a...</h1>
        <p className="text-secondarytext text-sm">
          Choose your role to personalize your experience
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full md:items-center">
        <RoleCard
          role="Teacher"
          description="Guide students in their learning journey"
          imagePath="/images/teacher.png"
          hoverColor="secondary"
          bgColor="bg-secondary/20"
          onClick={() => navigate("/teacher/teacherLogin")}
        />
        <RoleCard
          role="Student"
          description="Learn sign language at your own pace"
          imagePath="/images/student.png"
          hoverColor="primary"
          bgColor="bg-primary/20"
          onClick={() => navigate("/student/studentSignup")}
        />
        <RoleCard
          role="Individual"
          description="Learn sign language at your own pace"
          imagePath="/images/individual.png"
          hoverColor="accent/60"
          bgColor="bg-accent/60"
          onClick={() => navigate("/individual/individualLogin")}
        />
      </div>
    </div>
  );
};

export default RoleSelection;
