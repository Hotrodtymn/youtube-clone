import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Nav = ({ toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    history.push(
      `/search?query=${encodeURIComponent(search)}`
    );
  };

  return (
    <nav className="nav">
      <div className="nav__left">
        <button
          className="nav__menu"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <Link to="/" className="nav__logo">
          <span className="nav__logo--icon">
            ▶
          </span>

          <span>YouTube</span>
        </Link>
      </div>

      <form
        className="nav__search"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          type="submit"
          className="nav__search--button"
        >
          🔍
        </button>
      </form>

      <div className="nav__right">
        <button className="nav__icon">
          🎥
        </button>

        <button className="nav__icon">
          🔔
        </button>

        <div className="nav__profile">
          T
        </div>
      </div>
    </nav>
  );
};

export default Nav;