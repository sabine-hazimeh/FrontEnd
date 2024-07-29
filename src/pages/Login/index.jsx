import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email,
        password,
      });

      console.log("Full response:", response);

      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);

        navigate("/");
      } else {
        setError("Unexpected response structure");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setError("Invalid email or password");
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="insert your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="insert your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
