import HandLandmarkDetector from "@/components/common/HandLandmarkDetector";

const StudentQuiz = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Student Quiz</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <HandLandmarkDetector
            onLandmarksDetected={(landmarks) => {
              console.log("Detected landmarks:", landmarks);
            }}
            isEnabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
