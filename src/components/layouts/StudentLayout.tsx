import { Outlet } from "react-router";
import StudentNavbar from "@/components/student/StudentNavbar";

const SchoolLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgColor font-nunito">
      <div className="w-full flex-1 flex flex-col pb-20">
        <Outlet />
      </div>
      <StudentNavbar />
    </div>
  );
};

export default SchoolLayout;
