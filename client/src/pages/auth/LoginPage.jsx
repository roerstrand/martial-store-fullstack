import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Pages.css";
import useInput from "../../hooks/useInput.jsx";
import { login as loginService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const email = useInput("");
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
        email: email.value,
        password: password.value,
      });
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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
          type="email"
          placeholder="Username"
          {...email}
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
