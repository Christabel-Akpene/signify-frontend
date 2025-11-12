import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/")}
      variant={"ghost"}
      className="self-start p-2 hover:bg-primary/10 rounded-lg transition-colors"
    >
      <ArrowLeft className="w-6 h-6 text-textColor" />
    </Button>
  );
};

export default BackButton;
