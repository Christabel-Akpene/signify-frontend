import TeacherLayout from "@/components/layouts/TeacherLayout";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherLogin from "@/pages/teacher/TeacherLogin";
import TeacherSignup from "@/pages/teacher/TeacherSignup";
import { Routes, Route } from "react-router";

const TeacherRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/teacherSignup" element={<TeacherSignup />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route element={<TeacherLayout/>}>
            <Route path="/teacherDashboard" element={<TeacherDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default TeacherRoutes;
