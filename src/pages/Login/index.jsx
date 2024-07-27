import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email,
        password,
      });

      const token = response.data.authorisation.token;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
