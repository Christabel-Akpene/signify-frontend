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
          Select your role to access communication support tools
        </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full md:items-center">
        <RoleCard
          role="Teacher"
          description="Empower learners with speech difficulties using AI tools"
          imagePath="/images/teacher.png"
          hoverColor="secondary"
          bgColor="bg-secondary/20"
          onClick={() => navigate("/teacher/teacherSignup")}
        />
        <RoleCard
          role="Student"
          description="Access your learning materials and practice"
          imagePath="/images/student.png"
          hoverColor="primary"
          bgColor="bg-primary/20"
          onClick={() => navigate("/student/studentSignup")}
        />
        <RoleCard
          role="Individual"
          description="Practice communication skills independently"
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
