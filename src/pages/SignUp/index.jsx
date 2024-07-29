import React, { useState } from "react";
import axios from "axios";
import "./style.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name,
        email,
        password,
      });
      setError("");
      setSubmitted(false);
    } catch (error) {
      if (error.response) {
        const serverErrors = error.response.data.errors;
        const errorMessages = Object.values(serverErrors).flat().join(", ");
        setError(errorMessages);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="body">
      <form onSubmit={handleSubmit}>
        {submitted && error && <p className="error">{error}</p>}
        <div className="form-inputs">
          <label htmlFor="name">Name</label>
          <input
            type="text"
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
