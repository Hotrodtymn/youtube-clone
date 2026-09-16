import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();

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
    },
    {
      label: "Following",
      icon: "♡",
      to: "/",
    },
  ];

  const libraryItems = [
    {
  label: "Watch Later",
  icon: "◷",
  to: "/library?tab=watch-later",
},
   {
  label: "Favorites",
  icon: "★",
  to: "/library?tab=favorites",
},
    {
      label: "Music",
      icon: "♫",
      to: "/search?query=music",
    },
  ];

  const exploreItems = [
    {
      label: "Gaming",
      icon: "🎮",
      to: "/search?query=gaming",
    },
    {
      label: "Technology",
      icon: "💻",
      to: "/search?query=technology",
    },
    {
      label: "Design",
      icon: "🎨",
      to: "/search?query=design",
    },
  ];

  const renderLinks = (items) =>
    items.map((item) => (
      <Link
        key={item.label}
        to={item.to}
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