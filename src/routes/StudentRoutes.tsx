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
import SchoolLayout from "@/components/layouts/StudentLayout";
import StudentProfile from "@/pages/student/StudentProfile";
import StudentLessons from "@/pages/student/StudentLessons";
import StudentSettings from "@/pages/student/StudentSettings";

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
        <Route element={<SchoolLayout />}>
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
          <Route
            path="/studentProfile"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentLessons"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentLessons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studentSettings"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:lessonId"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                {/* Create this component to show individual lesson content */}
                <div>Individual Lesson View</div>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default StudentRoutes;
