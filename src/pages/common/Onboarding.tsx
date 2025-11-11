import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[url(/images/bg_image.png)] bg-center bg-cover h-dvh flex flex-col items-center justify-between py-8 px-6 relative">
      
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-secondary">
          Signify <span className="text-yellow-900">Ghana</span> 
        </h1>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center gap-1 relative z-10 mt-32">
        <p className="text-2xl font-bold text-white ">
          Bridge the gap
        </p>
        <p className="text-lg text-white/95 drop-shadow-md font-medium">
          Learn, Sign, Connect
        </p>
      </div>

      <Button onClick={()=> navigate("/roles")} className="relative z-10 bg-primary hover:bg-primary-dark text-white font-bold text-lg py-7 w-[90%] max-w-sm rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]">
        Get Started
      </Button>
    </div>
  );
};

export default Onboarding;