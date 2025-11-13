import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentSignName from "@/pages/student/StudentSignName";
import StudentSignup from "@/pages/student/StudentSignup";
import StudentLogin from "@/pages/student/StudentLogin";
import StudentLessonPath from "@/pages/student/StudentLessonPath";
import StudentQuiz from "@/pages/student/StudentQuiz";
import { Routes, Route } from "react-router";
import {
  ProtectedRoute,
  PublicRoute,
} from "@/components/common/ProtectedRoute";

const StudentRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/studentSignup"
          element={
            <PublicRoute>
              <StudentSignup />
            </PublicRoute>
          }
        />
        <Route
          path="/studentLogin"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/studentSignName"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentSignName />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentDashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentLessonPath"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentLessonPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studentQuiz"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentQuiz />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default StudentRoutes;
