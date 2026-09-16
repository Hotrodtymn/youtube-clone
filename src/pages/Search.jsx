import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { searchVideos } from "../services/youtubeApi";

const Search = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(
    location.search
  );

  const query = searchParams.get("query") || "";

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSearchResults = async () => {
      if (!query.trim()) {
        setVideos([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const results = await searchVideos(query);

        setVideos(results);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load search results."
        );
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="home__message">
        <h2>Searching YouTube...</h2>
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
    <div className="search-page">
      <h1 className="search-page__title">
        Search results for "{query}"
      </h1>

      {videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <div className="search-page__empty">
          <h2>No results found</h2>

          <p>
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;