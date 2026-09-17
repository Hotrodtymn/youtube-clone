import React from "react";

const VideoSkeleton = () => {
  return (
    <article className="video-skeleton">
      <div className="video-skeleton__thumbnail"></div>

      <div className="video-skeleton__info">
        <div className="video-skeleton__title"></div>
        <div className="video-skeleton__title short"></div>

        <div className="video-skeleton__meta">
          <div className="video-skeleton__avatar"></div>

          <div className="video-skeleton__channel">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VideoSkeleton;