import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import LearningPathCard from "@/components/teacher/LearningPathCard";
import StudentLineChart from "@/components/teacher/LineChart";

const StudentDetails = () => {
  const navigate = useNavigate();

  const { student } = useParams();
  console.log(student);

  return (
    <div className="min-h-dvh bg-bgColor flex flex-col px-3 py-4">
      <div className="flex items-center">
        <button onClick={() => navigate("")} className="">
          <ArrowLeft className="w-6 h-6 text-textColor" />
        </button>
        <h1 className="text-2xl font-semibold mx-auto">Akosua Manu</h1>
      </div>

      <p className="text-lg font-bold my-4">Learning Path</p>

      <div className="mb-3">
        <LearningPathCard module={"Alphabets"} status={"Completed"} />
        <LearningPathCard module={"Numbers"} status={"In progress"} />
        <LearningPathCard module={"Colors"} status={"Not started"} />
      </div>

      <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4">
        <p className="text-blue-600 font-semibold">Analytics</p>
        <p className="font-bold text-lg">Student Progress</p>
        <p className="text-sm mb-4">Student's score over the last week</p>
        <StudentLineChart/>
        {/* <Piechart /> */}
      </div>

      <p className="text-lg font-bold mb-4">Problem Signs</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center justify-center rounded-md p-4 bg-white shadow-md">
          Hello
        </div>
        <div className="flex items-center justify-center rounded-md p-4 bg-white shadow-md">
          Hello
        </div>
        <div className="flex items-center justify-center rounded-md p-4 bg-white shadow-md">
          Hello
        </div>
        <div className="flex items-center justify-center rounded-md p-4 bg-white shadow-md">
          Hello
        </div>

      </div>
    </div>
  );
};

export default StudentDetails;
