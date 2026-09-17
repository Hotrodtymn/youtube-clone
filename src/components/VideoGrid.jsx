import React from "react";
import VideoCard from "./Videocard";

const VideoGrid = ({ videos }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => {
        const videoId =
          typeof video.id === "string"
            ? video.id
            : video.id?.videoId;

        return (
          <VideoCard
            video={video}
            key={videoId}
          />
        );
      })}
    </div>
  );
};

export default VideoGrid;