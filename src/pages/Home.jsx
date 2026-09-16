import React, { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";
import { searchVideos } from "../services/youtubeApi";

const categories = [
  "All",
  "Music",
  "Gaming",
  "React",
  "JavaScript",
  "CSS",
  "Web Development",
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  const loadVideos = async (query) => {
    try {
      setLoading(true);
      setError("");

      const results = await searchVideos(query);

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

  useEffect(() => {
    loadVideos("web development");
  }, []);

  const handleCategory = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      loadVideos("web development");
    } else {
      loadVideos(category);
    }
  };

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
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "category active"
                : "category"
            }
            onClick={() =>
              handleCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      <VideoGrid videos={videos} />

    </div>
  );
};

export default Home;