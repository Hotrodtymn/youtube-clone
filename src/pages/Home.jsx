import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { searchVideos } from "../services/youtubeApi";

const categories = [
  {
    label: "All",
    query: "web development",
  },
  {
    label: "Music",
    query: "music",
  },
  {
    label: "Gaming",
    query: "gaming",
  },
  {
    label: "React",
    query: "React programming",
  },
  {
    label: "JavaScript",
    query: "JavaScript programming",
  },
  {
    label: "CSS",
    query: "CSS web design",
  },
  {
    label: "Web Development",
    query: "web development",
  },
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const loadVideos = async (query) => {
    try {
      setLoading(true);
      setError("");

      const results = await searchVideos(query);

      setVideos(results);
    } catch (error) {
      console.error(error);

      setError("Unable to load videos right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos("web development");
  }, []);

  const handleCategory = (category) => {
    setActiveCategory(category.label);
    loadVideos(category.query);
  };

  if (loading) {
    return (
      <div className="home__message">
        <div className="loading__spinner"></div>
        <h2>Finding something worth watching...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home__message">
        <h2>{error}</h2>

        <button
          className="home__retry"
          onClick={() => loadVideos("web development")}
        >
          Try again
        </button>
      </div>
    );
  }

  const featuredVideo = videos[0];
  const remainingVideos = videos.slice(1);

  return (
    <div className="home">
      {/* HERO */}

      <section
        className="home__hero"
        style={
          featuredVideo
            ? {
                backgroundImage: `linear-gradient(
            90deg,
            rgba(13, 13, 18, 0.98) 0%,
            rgba(13, 13, 18, 0.88) 38%,
            rgba(13, 13, 18, 0.35) 75%,
            rgba(13, 13, 18, 0.85) 100%
          ),
          url(${featuredVideo.snippet.thumbnails.high.url})`,
              }
            : undefined
        }
      >
        <div className="home__hero-content">
          <span className="home__eyebrow">✦ Featured on Rockstreamer</span>

          <h1>
            Find something
            <br />
            <span>worth watching.</span>
          </h1>

          <p>
            Discover videos, creators, music and ideas from around the world.
          </p>

          {featuredVideo && (
            <div className="home__hero-feature">
              <span>Featured video</span>

              <h2>{featuredVideo.snippet.title}</h2>

              <p>{featuredVideo.snippet.channelTitle}</p>

              <Link
                to={`/video/${featuredVideo.id.videoId}`}
                className="home__hero-button"
              >
                ▶ Watch now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="home__categories">
        {categories.map((category) => (
          <button
            key={category.label}
            className={
              activeCategory === category.label ? "category active" : "category"
            }
            onClick={() => handleCategory(category)}
          >
            {category.label}
          </button>
        ))}
      </section>

      {/* FEATURED */}

      {featuredVideo && (
        <section className="featured">
          <div className="section-heading">
            <div>
              <span className="section-heading__label">Featured</span>

              <h2>Something to watch</h2>
            </div>
          </div>

          <div className="featured__card">
            <div className="featured__image">
              <img
                src={featuredVideo.snippet.thumbnails.high.url}
                alt={featuredVideo.snippet.title}
              />

              <div className="featured__overlay">
                <span>▶ Watch now</span>
              </div>
            </div>

            <div className="featured__content">
              <span className="featured__tag">Featured video</span>

              <h3>{featuredVideo.snippet.title}</h3>

              <p>{featuredVideo.snippet.channelTitle}</p>

              <Link
                to={`/video/${featuredVideo.id.videoId}`}
                className="featured__button"
              >
                Watch video →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* VIDEO GRID */}

      <section className="popular">
        <div className="section-heading">
          <div>
            <span className="section-heading__label">Explore</span>

            <h2>Popular right now</h2>
          </div>

          <span className="section-heading__count">
            {remainingVideos.length} videos
          </span>
        </div>

        <VideoGrid videos={remainingVideos} />
      </section>
    </div>
  );
};

export default Home;
