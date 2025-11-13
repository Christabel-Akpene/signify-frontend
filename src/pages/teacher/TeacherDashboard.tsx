import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Piechart from "@/components/teacher/Piechart";
import { LabeledProgress } from "@/components/teacher/LabeledProgress";
import { StudentProgressCard } from "@/components/teacher/StudentProgressCard";
import { useState } from "react";

const TeacherDashboard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("GSL-A8K2");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-dvh bg-bgColor px-3 py-4 flex flex-col text-textColor">
      <h1 className="text-2xl font-semibold my-3">Welcome, Jane</h1>
      <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4">
        <p className="">Signify Ghana Classroom </p>
        <p className="text-2xl font-bold">GSL-A8K2</p>
        <div className="flex justify-between items-center">
          <p>Your classroom Code</p>
          <Button onClick={handleCopy} className="bg-blue-500 p-2 text-white cursor-pointer">
            {copied ? (
              <>
                <Check size={12} /> Copied!
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="text-lg font-bold mb-4">At a Glance Stats</p>
      <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4">
        <p className="font-semibold text-lg">Student Progress</p>
        <Piechart />
      </div>
      <div className="p-3 rounded-md bg-white shadow-md text-lg text-secondarytext mb-4">
        <p className="font-semibold text-lg">Student Progress</p>
        <p>Top 3 most missed signs</p>
        <LabeledProgress label="Hello" value={33} />
        <LabeledProgress label="Thank You" value={45} />
        <LabeledProgress label="Sorry" value={13} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">My Students</p>
        <p className="w-8 h-8 bg-blue-500 text-white text-2xl font-bold cursor-pointer text-center rounded-full">
          +
        </p>
      </div>

      <StudentProgressCard name="Ama Boadu" progress={95} status="on-track" />
      <StudentProgressCard
        name="Kwame Mensah"
        progress={42}
        status="struggling"
      />
      <StudentProgressCard name="Abena Owusu" progress={88} status="on-track" />
      <StudentProgressCard
        name="Kojo Appiah"
        progress={0}
        status="not-started"
      />
    </div>
  );
};

export default TeacherDashboard;
