import TeacherLayout from "@/components/layouts/TeacherLayout";
import TeacherStudents from "@/pages/teacher/TeacherStudents";
import TeacherDashboard from "@/pages/teacher/TeacherDashboard";
import TeacherSignup from "@/pages/teacher/TeacherSignup";
import { Routes, Route } from "react-router";
import StudentDetails from "@/pages/teacher/StudentDetails";
import TeacherProfile from "@/pages/teacher/TeacherProfile";
import TeacherTranslation from "@/pages/teacher/TeacherTranslation";
import TeacherLogin from "@/pages/teacher/TeacherLogin";

const TeacherRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/teacherSignup" element={<TeacherSignup />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route element={<TeacherLayout />}>
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="/teacherStudents" element={<TeacherStudents />} />
          <Route path="/teacherProfile" element={<TeacherProfile />} />
          <Route path="/teacherTranslation" element={<TeacherTranslation />} />
          <Route
            path="/teacherStudents/:student"
            element={<StudentDetails />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default TeacherRoutes;
