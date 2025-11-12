import {Outlet, Link, useLocation} from "react-router";
import {Home, User, ScanText } from "lucide-react";
import NavigationButton from "@/pages/common/NavigationButton";
const navigationItems = [
    {icon: Home, name: "Dashboard", to: "/teacher/teacherDashboard"},
    {icon: ScanText, name: "Translate", to: "/teacher/teacherTranslation"},
    {icon: User, name: "Profile", to: "/teacher/teacherProfile"},

]

const TeacherLayout = () => {
    const location = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bgColor font-nunito">
        <div className="w-full max-w-sm flex-1 flex flex-col pb-20">
            <Outlet/>

        </div>
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-bgColor border-t border-secondarytext shadow-md flex justify-around items-center px-4 py-2 z-50" role="navigation">
        {
            navigationItems.map((item) => {
                const isActive = location.pathname === item.to;
                return(
                    <Link key={item.to} to={item.to}>
                        <NavigationButton icon={item.icon} name={item.name} isActive={isActive}/>
                    </Link>
                )
            })
        }

        </nav>
    </div>
  )
}

export default TeacherLayout