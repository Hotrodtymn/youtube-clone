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
      <div className="search-page__message">
        <div className="loading__spinner"></div>

        <h2>Searching Rockstreamer...</h2>

        <p>
          Looking for something worth watching.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page__message">
        <h2>{error}</h2>

        <button
          className="home__retry"
          onClick={() =>
            window.location.reload()
          }
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="search-page">
      <header className="search-page__header">
        <span className="search-page__eyebrow">
          Search
        </span>

        <h1>
          Results for{" "}
          <span>"{query}"</span>
        </h1>

        <p>
          {videos.length} videos found
        </p>
      </header>

      {videos.length > 0 ? (
        <section className="search-page__results">
          <VideoGrid videos={videos} />
        </section>
      ) : (
        <div className="search-page__empty">
          <div className="search-page__empty-icon">
            ?
          </div>

          <h2>No videos found</h2>

          <p>
            We couldn't find anything matching
            "{query}".
          </p>

          <span>
            Try another search or explore
            something new.
          </span>
        </div>
      )}
    </div>
  );
};

export default Search;