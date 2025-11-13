import IndividualDashboard from "@/pages/individual/IndividualDashboard";
import IndividualSignName from "@/pages/individual/IndividualSignName";
import IndividualSignup from "@/pages/individual/IndividualSignup";
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
