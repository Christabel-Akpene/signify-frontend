import { useEffect, useState } from "react";
import { storage } from "../../services/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Card, CardContent } from "../../components/ui/card";
import { Play, Loader2 } from "lucide-react";

interface VideoItem {
  name: string;
  url: string;
  displayName: string;
}

const IndividualLessonPath = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const alphabetRef = ref(storage, "Alpabet");
        const result = await listAll(alphabetRef);

        const videoPromises = result.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const fileName = itemRef.name;
          // Extract letter from filename (e.g., "A.mp4" -> "A")
          const displayName = fileName.replace(/\.[^/.]+$/, "").toUpperCase();
          return {
            name: fileName,
            url,
            displayName,
          };
        });

        const videoList = await Promise.all(videoPromises);
        // Sort alphabetically
        videoList.sort((a, b) => a.displayName.localeCompare(b.displayName));

        setVideos(videoList);
        if (videoList.length > 0) {
          setCurrentVideo(videoList[0]);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bgColor flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">No videos found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden border border-border py-0">
            <CardContent className="p-0">
              <div className="relative bg-black aspect-video">
                {currentVideo && (
                  <video
                    key={currentVideo.url}
                    className="w-full h-full"
                    controls
                    autoPlay
                  >
                    <source src={currentVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">
                  {currentVideo?.displayName || "Sign Language"}
                </h1>
                <p className="text-gray-600">
                  Learn how to sign the letter "{currentVideo?.displayName}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video List Section */}
        <div className="lg:col-span-1">
          <Card className="border border-border">
            <CardContent className="">
              <h2 className="text-xl font-bold mb-4">Alphabet Letters</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {videos.map((video) => (
                  <button
                    key={video.name}
                    onClick={() => setCurrentVideo(video)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      currentVideo?.name === video.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="shrink-0 w-32 h-20 bg-gray-200 rounded relative overflow-hidden">
                      <video
                        src={video.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">
                        {video.displayName}
                      </h3>
                      <p className="text-sm opacity-80">Sign Language Letter</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndividualLessonPath;
