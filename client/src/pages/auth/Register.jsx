import React, { useState } from "react";
import UserCard from "./UserCard";
import "../Pages.css";
import useInput from "../../hooks/useInput.jsx";
import { register } from "../../services/authService";

function RegisterForm() {
  // useInput hanterar value + onChange automatiskt per fält
  const username = useInput("");
  const email = useInput("");
  const password = useInput("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nagivate = useNagivate();

  const handleRegister = async () => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <h1>Register</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="usernamem"
              type="text"
              value={username.value}
              onChange={username.onChange}
              placeholder="Enter username"
              disabled={loading}
            />

            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              value={email.value}
              onChange={email.onChange}
              placeholder="your@email.com"
              disabled={loading}
            />

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="text"
              value={email.value}
              onChange={email.onChange}
              placeholder="Enter password"
              disabled={loading}
            />

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
