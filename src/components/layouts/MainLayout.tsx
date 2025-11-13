import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-dvh text-textColor font-nunito">
      <Outlet />
    </div>
  );
};

export default MainLayout;
