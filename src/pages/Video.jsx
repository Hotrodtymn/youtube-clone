import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getVideo,
  getChannel,
  searchVideos,
  getComments,
} from "../services/youtubeApi";

import VideoCard from "../components/Videocard";

import {
  getWatchLater,
  addToWatchLater,
  removeFromWatchLater,
  isInWatchLater,
} from "../services/storage";

const Video = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError("");

        const videoData = await getVideo(id);

        if (!videoData) {
          throw new Error("Video not found");
        }

        setVideo(videoData);
        setSaved(isInWatchLater(id));

        const commentData = await getComments(id);

        setComments(commentData);

        const channelData = await getChannel(videoData.snippet.channelId);

        setChannel(channelData);

        const recommendations = await searchVideos(videoData.snippet.title);

        setRecommended(
          recommendations.filter((item) => item.id.videoId !== id),
        );
      } catch (error) {
        console.error(error);
        setError("Unable to load this video.");
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="video-page__message">
        <div className="loading__spinner"></div>
        <h2>Loading video...</h2>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="video-page__message">
        <h2>{error || "Video not found."}</h2>

        <Link to="/" className="video-page__back-button">
          ← Back to Discover
        </Link>
      </div>
    );
  }

  const { snippet, statistics } = video;

  const views = Number(statistics?.viewCount || 0).toLocaleString();

  const likes = Number(statistics?.likeCount || 0).toLocaleString();

  const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const description =
    snippet.description || "No description was provided for this video.";
  const channelImage =
    channel?.snippet?.thumbnails?.high?.url ||
    channel?.snippet?.thumbnails?.medium?.url ||
    channel?.snippet?.thumbnails?.default?.url;

  return (
    <div className="video-layout">
      <main className="video-page">
        <Link to="/" className="video-page__back">
          ← Back to Discover
        </Link>

        <div className="video-page__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet.title}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        <div className="video-page__info">
          <div className="video-page__eyebrow">Now watching</div>

          <div className="video-page__heading">
            <h1>{snippet.title}</h1>

            <div className="video-page__stats">
              <span>{views} views</span>
              <span>•</span>
              <span>{publishedDate}</span>
            </div>
          </div>

          <div className="video-page__actions">
            <button
              className={liked ? "video-action active" : "video-action"}
              onClick={() => setLiked(!liked)}
            >
              ♡<span>{liked ? "Liked" : "Like"}</span>
              <small>{likes}</small>
            </button>

            <button className="video-action">
              ↗<span>Share</span>
            </button>

            <button
              className={saved ? "video-action active" : "video-action"}
              onClick={() => {
                if (saved) {
                  removeFromWatchLater(id);
                  setSaved(false);
                } else {
                  addToWatchLater(video);
                  setSaved(true);
                }
              }}
            >
              ◷<span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>

          <div className="video-page__channel">
            {channelImage ? (
              <img
                src={channelImage}
                alt={snippet.channelTitle}
                className="video-channel__avatar"
              />
            ) : (
              <div className="video-channel__avatar">
                {snippet.channelTitle.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="video-channel__info">
              <strong>{snippet.channelTitle}</strong>

              <span>
                {Number(
                  channel?.statistics?.subscriberCount || 0,
                ).toLocaleString()}{" "}
                followers
              </span>
            </div>

            <button
              className={following ? "subscribe subscribed" : "subscribe"}
              onClick={() => setFollowing(!following)}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>

          <div className="video-page__description">
            <h3>About this video</h3>
            <p>{description}</p>{" "}
          </div>
        </div>

        <section className="comments">
          <div className="comments__heading">
            <h2>Comments</h2>
            <span>Join the conversation</span>
          </div>

          <div className="comment-form">
            <div className="comment-avatar">T</div>

            <input type="text" placeholder="Share your thoughts..." />

            <button>Post</button>
          </div>

          <div className="comment-list">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const commentData = comment.snippet.topLevelComment.snippet;

                const author = commentData.authorDisplayName || "Unknown user";

                const avatar = commentData.authorProfileImageUrl;

                const published = new Date(
                  commentData.publishedAt,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <article className="comment" key={comment.id}>
                    {avatar ? (
                      <img
                        className="comment-avatar"
                        src={avatar}
                        alt={author}
                      />
                    ) : (
                      <div className="comment-avatar">
                        {author.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="comment__content">
                      <div className="comment__author">
                        <strong>{author}</strong>
                        <span>{published}</span>
                      </div>

                      <p>
                        {commentData.textDisplay ||
                          commentData.textOriginal ||
                          ""}
                      </p>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="comments__empty">
                <p>No comments available for this video.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <aside className="recommended">
        <div className="recommended__heading">
          <span>Continue watching</span>
          <h2>Up next</h2>
        </div>

        <div className="recommended__list">
          {recommended.slice(0, 6).map((item) => (
            <VideoCard key={item.id.videoId} video={item} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Video;
