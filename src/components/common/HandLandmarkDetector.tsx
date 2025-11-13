import { useEffect, useRef, useState } from "react";
import { Hands, type Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

interface HandLandmarkDetectorProps {
  onLandmarksDetected: (landmarks: number[]) => void;
  isEnabled: boolean;
}

const HandLandmarkDetector = ({
  onLandmarksDetected,
  isEnabled,
}: HandLandmarkDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);
    handsRef.current = hands;

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current && isEnabled) {
          await hands.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });

    cameraRef.current = camera;
    camera.start();
    setIsReady(true);

    return () => {
      camera.stop();
      hands.close();
    };
  }, [isEnabled]);

  const onResults = (results: Results) => {
    if (!canvasRef.current) return;

    const canvasCtx = canvasRef.current.getContext("2d");
    if (!canvasCtx) return;

    // Draw the video frame
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Draw hand landmarks if detected
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];

      // Draw connections
      const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4], // Thumb
        [0, 5],
        [5, 6],
        [6, 7],
        [7, 8], // Index
        [0, 9],
        [9, 10],
        [10, 11],
        [11, 12], // Middle
        [0, 13],
        [13, 14],
        [14, 15],
        [15, 16], // Ring
        [0, 17],
        [17, 18],
        [18, 19],
        [19, 20], // Pinky
        [5, 9],
        [9, 13],
        [13, 17], // Palm
      ];

      canvasCtx.strokeStyle = "#00FF00";
      canvasCtx.lineWidth = 2;
      connections.forEach(([start, end]) => {
        canvasCtx.beginPath();
        canvasCtx.moveTo(
          landmarks[start].x * canvasRef.current!.width,
          landmarks[start].y * canvasRef.current!.height
        );
        canvasCtx.lineTo(
          landmarks[end].x * canvasRef.current!.width,
          landmarks[end].y * canvasRef.current!.height
        );
        canvasCtx.stroke();
      });

      // Draw landmarks
      canvasCtx.fillStyle = "#FF0000";
      landmarks.forEach((landmark) => {
        canvasCtx.beginPath();
        canvasCtx.arc(
          landmark.x * canvasRef.current!.width,
          landmark.y * canvasRef.current!.height,
          5,
          0,
          2 * Math.PI
        );
        canvasCtx.fill();
      });

      // Convert landmarks to flat array of x, y, z coordinates (63 values)
      const flatLandmarks = landmarks.flatMap((landmark) => [
        landmark.x,
        landmark.y,
        landmark.z,
      ]);

      onLandmarksDetected(flatLandmarks);
    }

    canvasCtx.restore();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <video ref={videoRef} className="hidden" playsInline />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="w-full h-auto border-2 border-gray-300 rounded-lg shadow-lg"
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg">
          <p className="text-white text-xl">Loading camera...</p>
        </div>
      )}
    </div>
  );
};

export default HandLandmarkDetector;
