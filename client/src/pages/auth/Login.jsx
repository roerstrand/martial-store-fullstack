import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages.css";
import useInput from "../../hooks/useInput.jsx";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const email = useInput("");
  const password = useInput("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("false");
  const navigate = useNagivate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService({email: email.value, password: password.value});
      login(data.user, data.token)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="page-container login-page">
      <div className="login-box">
        <h1>Login</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">EmaiL:</label>
            <input id="email"
            type="email"
            value={email.value}
            onChange={email.onChange}
            placeholder="your@email.com"
            disabled={loading}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id="password"
            value={password.value}
            onChange={password.onChange}
            placeholder="Enter password"
            disabled={loading}/>
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loggin in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;