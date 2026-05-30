import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar({ isOpen }) {
  // Token och login behövs ej från useAuth i navbar
  const [user, , , logout] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = (
    <>
      <Link to="/products" className="apex-nav-btn">
        ALL PRODUCTS <span className="apex-nav-chevron">&gt;</span>
      </Link>
      <Link to="/sale" className="apex-nav-btn">
        SALE <span className="apex-nav-chevron">&gt;</span>
      </Link>
      <Link to="/categories" className="apex-nav-btn">
        CATEGORIES <span className="apex-nav-chevron">&gt;</span>
      </Link>
      {user ? (
        <button onClick={handleLogout} className="apex-nav-btn">
          LOGOUT
        </button>
      ) : (
        <>
          <Link to="/login" className="apex-nav-btn">
            LOGIN <span className="apex-nav-chevron">&gt;</span>
          </Link>
          <Link to="/register" className="apex-nav-btn">
            REGISTER <span className="apex-nav-chevron">&gt;</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="apex-navbar">
        <div className="apex-navbar__items">{navItems}</div>
      </nav>
      <div className={`apex-mobile-nav ${isOpen ? "open" : ""}`}>
        {navItems}
      </div>
    </>
  );
}

export default Navbar;
