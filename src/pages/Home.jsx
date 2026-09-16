import React, { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";
import { searchVideos } from "../services/youtubeApi";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);

        const results = await searchVideos(
          "web development"
        );

        setVideos(results);
      } catch (error) {
        console.error(error);
        setError(
          "Unable to load YouTube videos."
        );
      } finally {
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  if (loading) {
    return (
      <div className="home__message">
        <h2>Loading videos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home__message">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="home__categories">
        <button className="category active">
          All
        </button>

        <button className="category">
          Music
        </button>

        <button className="category">
          Gaming
        </button>

        <button className="category">
          React
        </button>

        <button className="category">
          JavaScript
        </button>

        <button className="category">
          CSS
        </button>

        <button className="category">
          Web Development
        </button>
      </div>

      <VideoGrid videos={videos} />
    </div>
  );
};

export default Home;