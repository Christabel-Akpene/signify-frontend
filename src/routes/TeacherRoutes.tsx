import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherSignup from "@/pages/teacher/TeacherSignup";
import { Routes, Route } from "react-router";
import TeacherLogin from "@/pages/teacher/TeacherLogin";
import {
  ProtectedRoute,
  PublicRoute,
} from "@/components/common/ProtectedRoute";
import TeacherStudents from "@/pages/teacher/TeacherStudents";

const TeacherRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/teacherSignup"
          element={
            <PublicRoute>
              <TeacherSignup />
            </PublicRoute>
          }
        />
        <Route
          path="/teacherLogin"
          element={
            <PublicRoute>
              <TeacherLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/teacherDashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherStudents"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherStudents />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default TeacherRoutes;
