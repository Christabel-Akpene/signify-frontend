import { Route, Routes } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Onboarding from "./pages/common/Onboarding";
import RoleSelection from "./pages/common/RoleSelection";
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "@/routes/TeacherRoutes";
import IndividualRoutes from "@/routes/IndividualRoutes";
import { AuthProvider } from "@/contexts/AuthContext";
import Help from "@/pages/common/Help";
import Terms from "@/pages/common/Terms";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Onboarding />} />
          <Route path="/roles" element={<RoleSelection />} />
          <Route path="/help" element={<Help />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="student/*" element={<StudentRoutes />} />
        <Route path="teacher/*" element={<TeacherRoutes />} />
        <Route path="individual/*" element={<IndividualRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
