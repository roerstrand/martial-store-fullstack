import { Link, useNagivate } from "react-router-dom";
import { useAtuh } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const nagivate = useNagivate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="apex-navbar">
      <div className="apex-navbar__items">
        <Link to="/products" className="apex-nav-btn">
          all Products <span className="apex-nav-chevron"></span>
        </Link>
        <Link to="/sale" className="apex-nav-btn">
          sale <span className="apex-nav-chevron"></span>
        </Link>
        <Link to="/categories" className="apex-nav-btn">
          Categories <span className="apex-nav-chevron"></span>
        </Link>
        {user ? (
          <button onClick={handleLogout} className="apex-nav-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="apex-nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
