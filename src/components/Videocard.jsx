import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  const videoId =
    typeof video.id === "string"
      ? video.id
      : video.id?.videoId;

  if (!videoId) {
    return null;
  }

  const thumbnail =
    video.snippet?.thumbnails?.high?.url ||
    video.snippet?.thumbnails?.medium?.url ||
    video.snippet?.thumbnails?.default?.url;

  const title =
    video.snippet?.title || "Untitled video";

  const channel =
    video.snippet?.channelTitle ||
    "Unknown creator";

  const publishedDate =
    video.snippet?.publishedAt
      ? new Date(
          video.snippet.publishedAt
        ).toLocaleDateString()
      : "";

  return (
    <article className="video-card">
      <Link
        to={`/video/${videoId}`}
        className="video-card__thumbnail"
      >
        <img src={thumbnail} alt={title} />

        <div className="video-card__play">
          <span>▶</span>
        </div>
      </Link>

      <div className="video-card__info">
        <Link
          to={`/video/${videoId}`}
          className="video-card__title"
        >
          {title}
        </Link>

        <div className="video-card__meta">
          <div className="video-card__channel">
            <span className="video-card__avatar">
              {channel.charAt(0).toUpperCase()}
            </span>

            <span>{channel}</span>
          </div>

          {publishedDate && (
            <span className="video-card__date">
              {publishedDate}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default VideoCard;