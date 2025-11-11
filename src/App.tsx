import { Route, Routes } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import Onboarding from "./pages/common/Onboarding";
import RoleSelection from "./pages/common/RoleSelection";
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import IndividualRoutes from "./routes/IndividualRoutes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Onboarding />} />
            <Route path="/roles" element={<RoleSelection />} />
          </Route>
          <Route path="student/*" element={<StudentRoutes />} />
          <Route path="teacher/*" element={<TeacherRoutes />} />
          <Route path="individual/*" element={<IndividualRoutes />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
