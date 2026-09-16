import React from "react";
import VideoCard from "./Videocard";

const VideoGrid = ({ videos }) => {
  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard video={video} key={video.id.videoId} />
      ))}
    </div>
  );
};

export default VideoGrid;
