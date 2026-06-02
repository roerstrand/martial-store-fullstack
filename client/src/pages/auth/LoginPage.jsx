import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Pages.css";
import useInput from "../../hooks/useInput.jsx";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const username = useInput("");
  const password = useInput("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginService({
        username: username.value,
        password: password.value,
      });
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      if (!err.response) {
        setError("Cannot connect to server. Is the backend running?");
      } else {
        setError(err.response.data?.message || `Error ${err.response.status}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="apex-input"
          type="text"
          placeholder="Username"
          {...username}
          required
        />
        <input
          className="apex-input"
          type="password"
          placeholder="Password"
          {...password}
          required
        />
        <button type="submit" className="auth-btn-primary" disabled={loading}>
          LOGIN ›
        </button>
        <Link to="/register" className="auth-btn-secondary">
          REGISTER ›
        </Link>
        <Link to="/" className="auth-btn-secondary">
          BACK TO HOME ›
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
