import StudentDashboard from "@/pages/student/StudentDashboard";
import StudentSignName from "@/pages/student/StudentSignName";
import StudentSignup from "@/pages/student/StudentSignup";
import {Routes, Route} from "react-router";


const StudentRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/studentSignup" element={<StudentSignup/>} />
        <Route path="/studentSignName" element={<StudentSignName/>} />
        <Route path="/studentDashboard" element={<StudentDashboard/>} />
        
    </Routes>

    </>
  )
}

export default StudentRoutes