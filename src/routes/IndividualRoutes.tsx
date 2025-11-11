import IndividualDashboard from "@/pages/individual/IndividualDashboard";
import IndividualLogin from "@/pages/individual/IndividualLogin";
import IndividualSignName from "@/pages/individual/IndividualSignName";
import IndividualSignup from "@/pages/individual/IndividualSignup";
import { Routes, Route } from "react-router";

const IndividualRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/individualSignup" element={<IndividualSignup />} />
        <Route path="/individualLogin" element={<IndividualLogin />} />
        <Route path="/individualDashboard" element={<IndividualDashboard />} />
        <Route path="/individualSignName" element={<IndividualSignName />} />
      </Routes>
    </>
  );
};

export default IndividualRoutes;
