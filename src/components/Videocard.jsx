import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const videoId = video.id.videoId;

  return (
    <div className="video-card">
      <Link
        to={`/video/${videoId}`}
        className="video-card__thumbnail"
      >
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
        />
      </Link>

      <div className="video-card__info">
        <div className="video-card__details">
          <Link
            to={`/video/${videoId}`}
            className="video-card__title"
          >
            {video.snippet.title}
          </Link>

          <p className="video-card__channel">
            {video.snippet.channelTitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;