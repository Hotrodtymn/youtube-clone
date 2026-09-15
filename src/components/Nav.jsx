import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav__left">
        <button className="nav__menu">
          ☰
        </button>

        <Link to="/" className="nav__logo">
          <span className="nav__logo--icon">▶</span>
          <span>YouTube</span>
        </Link>
      </div>

      <div className="nav__search">
        <input
          type="text"
          placeholder="Search"
        />

        <button className="nav__search--button">
          🔍
        </button>
      </div>

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