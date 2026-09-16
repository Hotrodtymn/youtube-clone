import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "../components/Videocard";
import {
  getVideo,
  getChannel,
  searchVideos,
} from "../services/youtubeApi";

const Video = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [recommendedVideos, setRecommendedVideos] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] =
    useState(false);

  const [commentText, setCommentText] =
    useState("");

  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Developer",
      avatar: "J",
      text: "Great video!",
    },
    {
      id: 2,
      name: "Sarah Codes",
      avatar: "S",
      text: "This was really helpful.",
    },
  ]);

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

        // Load channel information
        if (videoData.snippet?.channelId) {
          try {
            const channelData = await getChannel(
              videoData.snippet.channelId
            );

            setChannel(channelData || null);
          } catch (channelError) {
            console.error(
              "Channel error:",
              channelError
            );

            setChannel(null);
          }
        }

        // Load recommended videos
        try {
          const recommended =
            await searchVideos(
              videoData.snippet.title
            );

          const filtered = recommended.filter(
            (item) =>
              item.id?.videoId !== id
          );

          setRecommendedVideos(filtered);
        } catch (recommendationError) {
          console.error(
            "Recommendation error:",
            recommendationError
          );

          setRecommendedVideos([]);
        }
      } catch (error) {
        console.error("Video error:", error);

        setError(
          error.message ||
            "Unable to load this YouTube video."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  const handleComment = (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    const newComment = {
      id: Date.now(),
      name: "Thomas",
      avatar: "T",
      text: commentText,
    };

    setComments([
      newComment,
      ...comments,
    ]);

    setCommentText("");
  };

  if (loading) {
    return (
      <div className="home__message">
        <h2>Loading video...</h2>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="video-page">
        <h2>
          {error || "Video not found"}
        </h2>

        <Link to="/">
          Back to Home
        </Link>
      </div>
    );
  }

  const title = video.snippet?.title || "Untitled";

  const channelTitle =
    video.snippet?.channelTitle ||
    "Unknown channel";

  const description =
    video.snippet?.description ||
    "No description available.";

  const viewCount =
    Number(
      video.statistics?.viewCount || 0
    ).toLocaleString();

  const publishedDate =
    video.snippet?.publishedAt
      ? new Date(
          video.snippet.publishedAt
        ).toLocaleDateString()
      : "";

  const channelName =
    channel?.snippet?.title ||
    channelTitle;

  const subscriberCount =
    channel?.statistics?.subscriberCount;

  const channelImage =
    channel?.snippet?.thumbnails?.default?.url ||
    channel?.snippet?.thumbnails?.medium?.url ||
    channel?.snippet?.thumbnails?.high?.url;

  return (
    <div className="video-layout">

      <main className="video-page">

        {/* YouTube Player */}
        <div className="video-page__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Information */}
        <div className="video-page__info">

          <h1>{title}</h1>

          <div className="video-page__stats">
            <span>
              {viewCount} views
            </span>

            <span>•</span>

            <span>
              {publishedDate}
            </span>
          </div>

          {/* Actions */}
          <div className="video-page__actions">

            <button
              className={
                liked
                  ? "video-action active"
                  : "video-action"
              }
              onClick={handleLike}
            >
              👍 Like
            </button>

            <button
              className={
                disliked
                  ? "video-action active"
                  : "video-action"
              }
              onClick={handleDislike}
            >
              👎 Dislike
            </button>

            <button className="video-action">
              ↗ Share
            </button>

            <button className="video-action">
              🔖 Save
            </button>

          </div>

          {/* Channel */}
          <div className="video-page__channel">

            {channelImage ? (
              <img
                src={channelImage}
                alt={channelName}
              />
            ) : (
              <div className="comment__avatar">
                {channelName
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div>
              <h3>{channelName}</h3>

              <p>
                {subscriberCount
                  ? `${Number(
                      subscriberCount
                    ).toLocaleString()} subscribers`
                  : "YouTube Channel"}
              </p>
            </div>

            <button
              className={
                subscribed
                  ? "subscribe subscribed"
                  : "subscribe"
              }
              onClick={() =>
                setSubscribed(
                  !subscribed
                )
              }
            >
              {subscribed
                ? "Subscribed"
                : "Subscribe"}
            </button>

          </div>

          {/* Description */}
          <div className="video-page__description">
            <p>{description}</p>
          </div>

        </div>

        {/* Comments */}
        <div className="comments">

          <h2>
            {comments.length} Comments
          </h2>

          <form
            className="comment-form"
            onSubmit={handleComment}
          >
            <div className="comment__avatar">
              T
            </div>

            <div className="comment-form__content">

              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) =>
                  setCommentText(
                    e.target.value
                  )
                }
              />

              <button type="submit">
                Comment
              </button>

            </div>
          </form>

          <div className="comment-list">

            {comments.map((comment) => (
              <div
                className="comment"
                key={comment.id}
              >
                <div className="comment__avatar">
                  {comment.avatar}
                </div>

                <div className="comment__content">

                  <h4>{comment.name}</h4>

                  <p>
                    {comment.text}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </div>

        <Link
          to="/"
          className="video-page__back"
        >
          ← Back to Home
        </Link>

      </main>

      {/* Recommended */}
      <aside className="recommended">

        <h2>Recommended</h2>

        <div className="recommended__list">

          {recommendedVideos.map(
            (recommendedVideo) => (
              <VideoCard
                key={
                  recommendedVideo.id?.videoId
                }
                video={recommendedVideo}
              />
            )
          )}

        </div>

      </aside>

    </div>
  );
};

export default Video;