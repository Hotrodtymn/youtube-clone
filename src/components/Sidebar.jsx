import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  return (
    <aside className={sidebarOpen ? "sidebar" : "sidebar sidebar--closed"}>
      {" "}
      <div className="sidebar__section">
        <Link to="/" className="sidebar__link active">
          <span className="sidebar__icon">⌂</span>
          <span>Home</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">▶</span>
          <span>Shorts</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">▣</span>
          <span>Subscriptions</span>
        </Link>
      </div>
      <div className="sidebar__divider"></div>
      <div className="sidebar__section">
        <h3 className="sidebar__heading">You</h3>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">▸</span>
          <span>Your channel</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">◴</span>
          <span>History</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">▱</span>
          <span>Playlists</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">▶</span>
          <span>Your videos</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">⌛</span>
          <span>Watch later</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">♡</span>
          <span>Liked videos</span>
        </Link>
      </div>
      <div className="sidebar__divider"></div>
      <div className="sidebar__section">
        <h3 className="sidebar__heading">Explore</h3>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">🔥</span>
          <span>Trending</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">♫</span>
          <span>Music</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">🎬</span>
          <span>Movies & TV</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">◉</span>
          <span>Live</span>
        </Link>

        <Link to="/" className="sidebar__link">
          <span className="sidebar__icon">⚽</span>
          <span>Sports</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
