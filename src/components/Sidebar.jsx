import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const tab = params.get("tab");

  const isHome =
    location.pathname === "/" && !location.search;

  const navItems = [
    {
      label: "Discover",
      icon: "⌂",
      to: "/",
      active: isHome,
    },
    {
      label: "Trending",
      icon: "🔥",
      to: "/search?query=trending",
      active:
        location.pathname === "/search" &&
        query === "trending",
    },
    {
      label: "Following",
      icon: "♡",
      to: "/",
      active: false,
    },
  ];

  const libraryItems = [
    {
      label: "Watch Later",
      icon: "◷",
      to: "/library?tab=watch-later",
      active:
        location.pathname === "/library" &&
        tab !== "favorites",
    },
    {
      label: "Favorites",
      icon: "★",
      to: "/library?tab=favorites",
      active:
        location.pathname === "/library" &&
        tab === "favorites",
    },
    {
      label: "Music",
      icon: "♫",
      to: "/search?query=music",
      active:
        location.pathname === "/search" &&
        query === "music",
    },
  ];

  const exploreItems = [
    {
      label: "Gaming",
      icon: "🎮",
      to: "/search?query=gaming",
      active:
        location.pathname === "/search" &&
        query === "gaming",
    },
    {
      label: "Technology",
      icon: "💻",
      to: "/search?query=technology",
      active:
        location.pathname === "/search" &&
        query === "technology",
    },
    {
      label: "Design",
      icon: "🎨",
      to: "/search?query=design",
      active:
        location.pathname === "/search" &&
        query === "design",
    },
  ];

  const renderLinks = (items) =>
    items.map((item) => (
      <Link
        key={item.label}
        to={item.to}
        onClick={closeSidebar}
        className={
          item.active
            ? "sidebar__link active"
            : "sidebar__link"
        }
      >
        <span className="sidebar__icon">
          {item.icon}
        </span>

        <span>{item.label}</span>
      </Link>
    ));

  return (
    <aside
      className={
        sidebarOpen
          ? "sidebar"
          : "sidebar sidebar--closed"
      }
    >
      <nav>
        {renderLinks(navItems)}

        <div className="sidebar__section">
          <div className="sidebar__section-title">
            Library
          </div>

          {renderLinks(libraryItems)}
        </div>

        <div className="sidebar__section">
          <div className="sidebar__section-title">
            Explore
          </div>

          {renderLinks(exploreItems)}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;