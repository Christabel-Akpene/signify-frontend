import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

export const useAuthActions = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { handleLogout };
};
