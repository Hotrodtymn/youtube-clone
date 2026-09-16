import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import {
  getWatchLater,
  getFavorites,
} from "../services/storage";

const Library = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialTab =
    params.get("tab") === "favorites"
      ? "favorites"
      : "watch-later";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [videos, setVideos] = useState([]);

  const loadVideos = (tab) => {
    if (tab === "favorites") {
      setVideos(getFavorites());
    } else {
      setVideos(getWatchLater());
    }
  };

  useEffect(() => {
    loadVideos(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadVideos(tab);
  };

  return (
    <div className="library-page">
      <header className="library-page__header">
        <span className="library-page__eyebrow">
          Your collection
        </span>

        <h1>Library</h1>

        <p>
          Keep track of videos you want to watch again.
        </p>
      </header>

      <div className="library-page__tabs">
        <button
          className={
            activeTab === "watch-later"
              ? "library-tab active"
              : "library-tab"
          }
          onClick={() =>
            handleTabChange("watch-later")
          }
        >
          ◷ Watch Later
        </button>

        <button
          className={
            activeTab === "favorites"
              ? "library-tab active"
              : "library-tab"
          }
          onClick={() =>
            handleTabChange("favorites")
          }
        >
          ★ Favorites
        </button>
      </div>

      <section className="library-page__content">
        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <div className="library-page__empty">
            <div className="library-page__empty-icon">
              {activeTab === "favorites" ? "★" : "◷"}
            </div>

            <h2>
              {activeTab === "favorites"
                ? "No favorites yet"
                : "Nothing saved yet"}
            </h2>

            <p>
              {activeTab === "favorites"
                ? "Videos you favorite will appear here."
                : "Save videos while watching and they'll appear here."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Library;