import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header>
      <a href="#" className="logo">
        SyntaxStudio
      </a>
      <ul>
        <li>
          <NavLink
            to="/"
            exact
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/chats"
            exact
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Chats
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signUp"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            SignUp
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
