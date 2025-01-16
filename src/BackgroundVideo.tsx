import { useEffect, useRef, useState } from "react";
import video1 from "./assets/bgVideo1.mp4";
import video2 from "./assets/bgVideo2.mp4";
import video3 from "./assets/bgVideo3.mp4";

export const BackgroundVideo = ({ videos = [video1, video2, video3] }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoDurations, setVideoDurations] = useState<number[]>([]);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const FADE_DURATION_SECONDS = 3;

  // Set durations after videos load
  useEffect(() => {
    if (!videoRefs.current) return;
    const durations = videoRefs.current.map(
      (video: HTMLVideoElement) =>
        video ? Math.max(0, video.duration - FADE_DURATION_SECONDS) : 10 // Default to 10 seconds if duration isn't available
    );
    setVideoDurations(durations);
  }, []);

  useEffect(() => {
    if (videoDurations.length === 0) return;

    // Reset the current video to start at the beginning
    videoRefs.current[currentVideoIndex].currentTime = 0;
    videoRefs.current[currentVideoIndex].playbackRate = 0.66;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, videoDurations[currentVideoIndex] * 1000);

    return () => clearInterval(interval);
  }, [currentVideoIndex, videoDurations]);

  return (
    <div className="absolute z-0 w-full h-screen overflow-hidden">
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => {
            if (el) videoRefs.current[index] = el;
          }}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-3000 ${
            index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          src={video}
          muted
          autoPlay
          loop
          playsInline
          onLoadedMetadata={() => {
            const durations = videoRefs.current.map((video) =>
              video ? Math.max(0, video.duration - FADE_DURATION_SECONDS) : 10
            );
            setVideoDurations(durations);
          }}
        />
      ))}
    </div>
  );
};
