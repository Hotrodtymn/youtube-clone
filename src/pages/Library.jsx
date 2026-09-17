import React, { useEffect, useState } from "react";
import {
  useLocation,
  useHistory,
} from "react-router-dom";import VideoCard from "../components/Videocard";
import {
  getWatchLater,
  getFavorites,
  removeFromWatchLater,
  removeFromFavorites,
} from "../services/storage";

const Library = () => {
  const location = useLocation();
const history = useHistory();
  useEffect(() => {
  const params = new URLSearchParams(
    location.search
  );

  const tab =
    params.get("tab") === "favorites"
      ? "favorites"
      : "watch-later";

  setActiveTab(tab);
  loadVideos(tab);
}, [location.search]);

  const [activeTab, setActiveTab] = useState("watch-later");
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
  history.push(
    `/library?tab=${tab}`
  );
};

  const handleRemove = (videoId) => {
    if (activeTab === "favorites") {
      removeFromFavorites(videoId);
    } else {
      removeFromWatchLater(videoId);
    }

    setVideos((currentVideos) =>
      currentVideos.filter(
        (video) => video.id !== videoId
      )
    );
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
          <div className="library-page__grid">
            {videos.map((video) => (
              <div
                className="library-page__item"
                key={video.id}
              >
                <VideoCard video={video} />

                <button
                  className="library-page__remove"
                  onClick={() =>
                    handleRemove(video.id)
                  }
                >
                  × Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="library-page__empty">
            <div className="library-page__empty-icon">
              {activeTab === "favorites"
                ? "★"
                : "◷"}
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