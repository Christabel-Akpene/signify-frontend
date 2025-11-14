import IndividualDashboard from "@/pages/individual/IndividualDashboard";
import IndividualSignName from "@/pages/individual/IndividualSignName";
import IndividualSignup from "@/pages/individual/IndividualSignup";
import IndividualLessons from "@/pages/individual/IndividualLessons";
import IndividualQuiz from "@/pages/individual/IndividualQuiz";
import IndividualProfile from "@/pages/individual/IndividualProfile";
import { Routes, Route } from "react-router";
import {
  ProtectedRoute,
  PublicRoute,
} from "@/components/common/ProtectedRoute";
import IndividualLogin from "@/pages/individual/IndividualLogin";

const IndividualRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/individualSignup"
          element={
            <PublicRoute>
              <IndividualSignup />
            </PublicRoute>
          }
        />
        <Route
          path="/individualLogin"
          element={
            <PublicRoute>
              <IndividualLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/individualDashboard"
          element={
            <ProtectedRoute allowedRoles={["individual"]}>
              <IndividualDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individualLessons"
          element={
            <ProtectedRoute allowedRoles={["individual"]}>
              <IndividualLessons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individualQuiz"
          element={
            <ProtectedRoute allowedRoles={["individual"]}>
              <IndividualQuiz />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individualProfile"
          element={
            <ProtectedRoute allowedRoles={["individual"]}>
              <IndividualProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individualSignName"
          element={
            <ProtectedRoute allowedRoles={["individual"]}>
              <IndividualSignName />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default IndividualRoutes;
