import { NavLink } from "react-router";
import { Home, Users } from "lucide-react";

const navigationLinks = [
  { to: "/teacherDashboard", icon: Home, label: "Home" },
  { to: "/teacherStudents", icon: Users, label: "Students" },
];

const TeacherNavbar = () => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-between shadow-lg py-2 px-4 rounded-full w-[260px] md:w-[300px] z-50 bg-primary/20 backdrop-blur-md border border-border">
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
          <link.icon size={22} />
        </NavLink>
      ))}
    </nav>
  );
};

export default TeacherNavbar;
