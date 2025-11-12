import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="w-full min-h-dvh flex flex-col text-textColor">
      <Outlet />
    </div>
  );
};

export default MainLayout;
