import { StudentProgressCard } from "@/components/teacher/StudentProgressCard";

const TeacherStudents = () => {
  return (
    <div className="min-h-dvh bg-bgColor px-6 py-8">
        <h1 className="text-2xl text-center font-semibold mb-4">All Students</h1>
        
        <div>
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
    </div>
  )
}

export default TeacherStudents
