import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"teacher" | "student" | "individual">;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { currentUser, userData, loading } = useAuth();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgColor">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-textColor">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !currentUser) {
    return <Navigate to="/roles" replace />;
  }

  // If user is logged in but trying to access auth pages (login/signup)
  if (!requireAuth && currentUser && userData) {
    // Redirect authenticated users to their respective dashboards
    switch (userData.role) {
      case "teacher":
        return <Navigate to="/teacher/teacherDashboard" replace />;
      case "student":
        return <Navigate to="/student/studentDashboard" replace />;
      case "individual":
        return <Navigate to="/individual/individualDashboard" replace />;
      default:
        return <Navigate to="/roles" replace />;
    }
  }

  // If specific roles are required, check if user has the right role
  if (allowedRoles && userData) {
    if (!allowedRoles.includes(userData.role)) {
      // Redirect to their own dashboard if trying to access unauthorized area
      switch (userData.role) {
        case "teacher":
          return <Navigate to="/teacher/teacherDashboard" replace />;
        case "student":
          return <Navigate to="/student/studentDashboard" replace />;
        case "individual":
          return <Navigate to="/individual/individualDashboard" replace />;
        default:
          return <Navigate to="/roles" replace />;
      }
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

// Public route component - for pages that should only be accessible when NOT authenticated
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute requireAuth={false}>{children}</ProtectedRoute>;
};
