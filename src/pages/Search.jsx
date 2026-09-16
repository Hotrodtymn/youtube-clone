import React from "react";
import { useLocation } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { videos } from "../data";

const Search = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(
    location.search
  );

  const query = searchParams.get("query") || "";

  const filteredVideos = videos.filter((video) => {
    const searchText = query.toLowerCase();

    return (
      video.title.toLowerCase().includes(searchText) ||
      video.channel.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="search-page">
      <h1 className="search-page__title">
        Search results for "{query}"
      </h1>

      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} />
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