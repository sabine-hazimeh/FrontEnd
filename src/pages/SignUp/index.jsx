import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Corrected typo here
  const [error, setError] = useState(""); // Uncomment if you need to handle errors

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name,
        email,
        password, // Corrected typo here
      });
      // const token = response.data.authorisation.token;
      // localStorage.setItem("token", token);
    } catch (error) {
      setError("Invalid email or password"); // Uncomment if you need to handle errors
      console.log(error.response ? error.response.data : "error");
    }
  };

  return (
    <>
      <div className="body">
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <label htmlFor="name">Name</label>
            <input
              type="text" // Changed type to "text"
              id="name"
              placeholder="Insert your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Insert your email"
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
              placeholder="Insert your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
