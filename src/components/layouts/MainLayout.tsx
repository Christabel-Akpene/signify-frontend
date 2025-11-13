import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-dvh text-textColor font-nunito">
        <div className="w-full max-w-sm min-h-dvh flex flex-col">
            <Outlet/>
        </div>

    </div>
  );
};

export default MainLayout;
