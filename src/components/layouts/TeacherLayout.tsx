import { Outlet } from "react-router";
import TeacherNavbar from "../teacher/TeacherNavbar";


const TeacherLayout = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgColor font-nunito">
      <div className="w-full max-w-sm flex-1 flex flex-col pb-20">
        <Outlet />
      </div>
      <TeacherNavbar />
    </div>
  );
};

export default TeacherLayout;
