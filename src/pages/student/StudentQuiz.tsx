import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import HandLandmarkDetector from "@/components/common/HandLandmarkDetector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowLeft, Trophy, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { predict, loadModel } from "@/services/model";
import * as tf from "@tensorflow/tfjs";
import {
  getAllLessons,
  updateStudentProgress,
  completLesson,
  getNameSignSequence,
  type Lesson,
} from "@/api/lessons";

interface QuizQuestion {
  sign: string;
  displayText: string;
}

const StudentQuiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userData } = useAuth();
  const lessonId = searchParams.get("lessonId");

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDetecting, setIsDetecting] = useState(true);
  const [detectionResult, setDetectionResult] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [lastPredictedLetter, setLastPredictedLetter] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(0);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [studentName, setStudentName] = useState<string>("");
  const [isNameInputPhase, setIsNameInputPhase] = useState(false);

  // Sign label mapping based on your model's classes
  const CLASS_LABELS = [
    "A",
    "B",
    "C",
    "D",
    "DEL",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "SPACE",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    initModel();
  }, []);

  useEffect(() => {
    const loadLesson = async () => {
      if (!lessonId) {
        navigate("/student/lessons");
        return;
      }

      try {
        const lessons = await getAllLessons();
        const currentLesson = lessons.find((l) => l.id === lessonId);

        if (!currentLesson) {
          navigate("/student/lessons");
          return;
        }

        setLesson(currentLesson);

        // Check if this is the name spelling lesson
        if (currentLesson.id === "lesson-spell-name") {
          setIsNameInputPhase(true);
          setIsDetecting(false);
        } else {
          // Create quiz questions from lesson signs
          const quizQuestions: QuizQuestion[] = currentLesson.signs.map(
            (sign) => ({
              sign: sign,
              displayText: sign.charAt(0).toUpperCase() + sign.slice(1),
            })
          );

          // Shuffle questions
          const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
          setQuestions(shuffled);
        }
      } catch (error) {
        console.error("Error loading lesson:", error);
      }
    };

    loadLesson();
  }, [lessonId, navigate]);

  const handleLandmarksDetected = useCallback(
    async (landmarks: number[]) => {
      if (!isDetecting || feedback !== null || !isModelLoaded) return;

      try {
        // Prepare input tensor (63 features: 21 landmarks × 3 coordinates)
        const inputTensor = tf.tensor2d([landmarks], [1, 63]);

        // Get prediction
        const result = await predict(inputTensor);
        const predictionData = await result.data();
        const predictedClass = predictionData.indexOf(
          Math.max(...Array.from(predictionData))
        );
        const predictionConfidence =
          Math.max(...Array.from(predictionData)) * 100;
        const predictedLetter = CLASS_LABELS[predictedClass];

        setConfidence(predictionConfidence);

        // Only update if confidence is high enough and letter is different from last
        if (
          predictionConfidence > 70 &&
          predictedLetter !== lastPredictedLetter
        ) {
          setLastPredictedLetter(predictedLetter);
          setDetectionResult(predictedLetter);
        }

        // Cleanup tensors
        inputTensor.dispose();
        result.dispose();
      } catch (error) {
        console.error("Error during prediction:", error);
      }
    },
    [isDetecting, feedback, isModelLoaded, lastPredictedLetter]
  );

  const handleSubmitAnswer = async () => {
    if (!detectionResult || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      detectionResult.toLowerCase() === currentQuestion.sign.toLowerCase();

    setFeedback(isCorrect ? "correct" : "incorrect");
    setIsDetecting(false);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCorrectAnswers((prev) => [...prev, currentQuestion.sign]);
    } else {
      setIncorrectAnswers((prev) => [...prev, currentQuestion.sign]);
    }

    // Update progress in real-time after each question
    if (userData?.uid && lessonId) {
      try {
        const currentScore = isCorrect ? score + 1 : score;
        const answeredQuestions = currentQuestionIndex + 1;
        const progressPercentage = Math.round(
          (currentScore / answeredQuestions) * 100
        );

        const updatedCorrectAnswers = isCorrect
          ? [...correctAnswers, currentQuestion.sign]
          : correctAnswers;
        const updatedIncorrectAnswers = !isCorrect
          ? [...incorrectAnswers, currentQuestion.sign]
          : incorrectAnswers;

        await updateStudentProgress(userData.uid, lessonId, {
          progress: progressPercentage,
          correctSigns: updatedCorrectAnswers,
          incorrectSigns: updatedIncorrectAnswers,
        });
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setDetectionResult(null);
      setFeedback(null);
      setLastPredictedLetter("");
      setConfidence(0);
      setIsDetecting(true);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setIsQuizComplete(true);
    setIsDetecting(false);

    if (!userData?.uid || !lessonId) return;

    try {
      const progressPercentage = Math.round((score / questions.length) * 100);
      const starsEarned =
        progressPercentage >= 90
          ? 3
          : progressPercentage >= 70
          ? 2
          : progressPercentage >= 50
          ? 1
          : 0;

      await updateStudentProgress(userData.uid, lessonId, {
        progress: progressPercentage,
        correctSigns: correctAnswers,
        incorrectSigns: incorrectAnswers,
      });

      if (progressPercentage >= 70) {
        await completLesson(userData.uid, lessonId, starsEarned);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleNameSubmit = () => {
    if (studentName.trim().length === 0) return;

    const nameLetters = getNameSignSequence(studentName);
    const quizQuestions: QuizQuestion[] = nameLetters.map((letter) => ({
      sign: letter,
      displayText: letter,
    }));

    setQuestions(quizQuestions);
    setIsNameInputPhase(false);
    setIsDetecting(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setIsQuizComplete(false);
    setFeedback(null);
    setDetectionResult(null);
    setLastPredictedLetter("");
    setConfidence(0);

    // For name spelling lesson, go back to name input
    if (lesson?.id === "lesson-spell-name") {
      setIsNameInputPhase(true);
      setIsDetecting(false);
      setStudentName("");
      setQuestions([]);
    } else {
      setIsDetecting(true);
      // Reshuffle questions
      setQuestions((prev) => [...prev].sort(() => Math.random() - 0.5));
    }
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <p className="text-textColor">Loading quiz...</p>
      </div>
    );
  }

  if (!isModelLoaded) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <div className="text-center">
          <p className="text-textColor text-xl mb-2">Loading AI Model...</p>
          <p className="text-secondarytext">Please wait...</p>
        </div>
      </div>
    );
  }

  // Name input phase for spelling lesson
  if (isNameInputPhase && lesson?.id === "lesson-spell-name") {
    return (
      <div className="min-h-screen bg-bgColor p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/student/lessons")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
            <CardTitle className="text-center text-3xl">
              ✍️ Spell Your Name
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-secondarytext">
              Enter your name below and you'll practice signing each letter!
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && studentName.trim().length > 0) {
                      handleNameSubmit();
                    }
                  }}
                />
              </div>

              {studentName && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">
                    You'll sign these letters:
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {getNameSignSequence(studentName).join(" → ")}
                  </p>
                  <p className="text-sm text-secondarytext mt-2">
                    {getNameSignSequence(studentName).length} letters to
                    practice
                  </p>
                </div>
              )}

              <Button
                onClick={handleNameSubmit}
                disabled={studentName.trim().length === 0}
                className="w-full py-6 text-lg"
              >
                Start Practice
              </Button>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900">
                <strong>💡 Tip:</strong> Make sure you know the alphabet signs
                before starting! This will help you spell your name correctly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const starsEarned =
      percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0;

    return (
      <div className="min-h-screen bg-bgColor p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Trophy className="text-yellow-500 w-8 h-8" />
              Quiz Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-2xl font-semibold mb-4">{percentage}%</p>

              {starsEarned > 0 && (
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-10 h-10 ${
                        star <= starsEarned
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="text-lg text-secondarytext mb-6">
                {lesson?.id === "lesson-spell-name"
                  ? percentage >= 90
                    ? `Perfect! You can sign your name "${studentName}" fluently!`
                    : percentage >= 70
                    ? `Great job spelling "${studentName}"! Keep practicing!`
                    : `Good effort! Practice the letters in "${studentName}" you missed.`
                  : percentage >= 90
                  ? "Outstanding! You're a sign language master!"
                  : percentage >= 70
                  ? "Great job! Keep practicing!"
                  : percentage >= 50
                  ? "Good effort! Try practicing the signs you missed."
                  : "Keep practicing! You'll get better with time."}
              </p>
            </div>

            {incorrectAnswers.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Signs to practice:</p>
                <p className="text-sm text-secondarytext">
                  {incorrectAnswers.join(", ")}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="flex-1"
              >
                Try Again
              </Button>
              <Button
                onClick={() => navigate("/student/lessons")}
                className="flex-1"
              >
                Back to Lessons
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Additional check for regular lessons
  if (questions.length === 0 && lesson.id !== "lesson-spell-name") {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <p className="text-textColor">Loading quiz...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-bgColor p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/student/studentLessons")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Quiz
          </Button>
          <div className="text-right">
            <p className="text-sm text-secondarytext">Score</p>
            <p className="text-lg font-bold text-primary">
              {score}/{questions.length}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-secondarytext">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-secondarytext">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {lesson?.id === "lesson-spell-name"
                ? `Sign the letter: "${currentQuestion.displayText}"`
                : `Sign: "${currentQuestion.displayText}"`}
            </CardTitle>
            {lesson?.id === "lesson-spell-name" && studentName && (
              <p className="text-center text-secondarytext mt-2">
                Spelling: <span className="font-bold">{studentName}</span>
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reference Image */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-center text-sm font-semibold text-gray-700 mb-3">
                📖 Reference Sign
              </p>
              <div className="flex justify-center">
                <img
                  src={`/sign-reference/${currentQuestion.sign.toUpperCase()}.png`}
                  alt={`Sign for ${currentQuestion.displayText}`}
                  className="w-48 h-48 object-contain bg-white rounded-lg shadow-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <p className="text-center text-xs text-gray-600 mt-2">
                Copy this hand sign
              </p>
            </div>

            <p className="text-center text-secondarytext">
              Show the sign in front of the camera
            </p>

            {/* Video Feed */}
            <HandLandmarkDetector
              onLandmarksDetected={handleLandmarksDetected}
              isEnabled={isDetecting}
            />

            {/* Detection Result */}
            {detectionResult && (
              <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                <p className="text-lg">
                  Detected:{" "}
                  <span className="font-bold text-primary text-2xl">
                    {detectionResult}
                  </span>
                </p>
                <p className="text-sm text-secondarytext mt-1">
                  Confidence: {confidence.toFixed(1)}%
                </p>
              </div>
            )}

            {/* Feedback */}
            {feedback && (
              <div
                className={`flex items-center justify-center gap-2 p-4 rounded-lg ${
                  feedback === "correct"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {feedback === "correct" ? (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Correct! Well done!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold">
                      Not quite. The correct sign is "
                      {currentQuestion.displayText}"
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Submit Button */}
            {!feedback && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!detectionResult}
                className="w-full"
              >
                Submit Answer
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-blue-50">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Make sure your hand is clearly visible in
              the camera. Hold the sign steady for best results.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentQuiz;
