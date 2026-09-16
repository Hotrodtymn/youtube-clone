import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Nav = ({ toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSearch = (event) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    history.push(
      `/search?query=${encodeURIComponent(search.trim())}`
    );
  };

  return (
    <header className="nav">
      <div className="nav__left">
        <button
          className="nav__menu"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link to="/" className="nav__logo">
          <span className="nav__logo--icon">
            ▶
          </span>

          <span className="nav__logo--text">
            Rockstreamer
          </span>
        </Link>
      </div>

      <form
        className="nav__search"
        onSubmit={handleSearch}
      >
        <span className="nav__search-icon">
          ⌕
        </span>

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search videos, creators, topics..."
          aria-label="Search"
        />

        {search && (
          <button
            type="button"
            className="nav__search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        <button
          type="submit"
          className="nav__search-button"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>

      <div className="nav__right">
        <button
          className="nav__icon-button"
          aria-label="Notifications"
        >
          ♢
        </button>

        <button
          className="nav__profile"
          aria-label="Profile"
        >
          T
        </button>
      </div>
    </header>
  );
};

export default Nav;