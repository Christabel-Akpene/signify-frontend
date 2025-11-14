import { NavLink } from "react-router";
import { LayoutDashboard, User, Users, ScanText,GraduationCap  } from "lucide-react";

const navigationLinks = [
  { icon: LayoutDashboard, name: "Dashboard", to: "/teacher/teacherDashboard" },
  { icon: Users, name: "Students", to: "/teacher/teacherStudents" },
  { icon: GraduationCap, name: "Lessons", to: "/teacher/teacherLessons" },
  // { icon: ScanText, name: "Translate", to: "/teacher/teacherTranslation" },
  { icon: User, name: "Profile", to: "/teacher/teacherProfile" },
];
const TeacherNavbar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between shadow-lg py-2 px-4 rounded-full w-[300px] md:w-[350px] z-50 bg-primary/20 backdrop-blur-md border border-white">
      {navigationLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center justify-center size-10 rounded-full transition-all duration-200 ${
              isActive
                ? "scale-110 text-primary bg-card/60 shadow-lg opacity-100"
                : "opacity-70 bg-transparent"
            }`
          }
        >
          <link.icon size={24} />
        </NavLink>
      ))}
    </nav>
  );
};

export default TeacherNavbar;
