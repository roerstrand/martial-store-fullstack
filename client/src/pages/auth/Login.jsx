import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages.css";
import useInput from "../../hooks/useInput.jsx";
import { login } from "../../services/authService";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email: email.value, password: password.value });
      navigate("/");
    } catch (err) {
      setError(err.reponse?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container login-page">
      <div className="login-box">
        <h1>Log in</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email.value}
              onChange={email.onChange}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password.value}
              onChange={password.onChange}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
