import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header>
      <a href="/" className="logo">
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
        {!token ? (
          <>
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
          </>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
