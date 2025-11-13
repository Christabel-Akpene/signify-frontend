import { CircleUserRound } from "lucide-react";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Button } from "@/components/ui/button";

const TeacherProfile = () => {
  const { handleLogout } = useAuthActions();

  return (
    <div className="min-h-dvh">
      <div className="px-4">
        <div className="w-26 h-26 rounded-full flex items-center justify-center m-auto mt-10">
          <CircleUserRound className="text-secondarytext" size="52" />
        </div>
        <p className="text-2xl font-bold uppercase text-center mt-3">
          Adwoa Manu
        </p>
        <p className="text-center mt-2 mb-8">adjoa@gmail.com</p>

        <div className="shadow-md p-3 rounded-2xl mt-8 bg-white">
          <p className="font-bold my-3">Personal Info</p>
          <div className="flex justify-between items-center mb-2">
            <p className="text-primary-gray">Phone: </p>
            <p className="font-bold">+233 24 987 6543</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-primary-gray">Email: </p>
            <p className="font-bold">adjoa@gmail.com</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-primary-gray">School: </p>
            <p className="font-bold">St. Thomas Aquinas</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-primary-gray">Member Since: </p>
            <p className="font-bold">Jan 2026</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          Logout
        </Button>
        <button className="w-full bg-accent text-white my-8 rounded-md font-semibold cursor-pointer py-1">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default TeacherProfile;
