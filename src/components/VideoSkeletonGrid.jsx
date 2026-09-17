import React from "react";
import VideoSkeleton from "./VideoSkeleton";

const VideoSkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="video-grid">
      {Array.from({ length: count }).map((_, index) => (
        <VideoSkeleton key={index} />
      ))}
    </div>
  );
};

export default VideoSkeletonGrid;