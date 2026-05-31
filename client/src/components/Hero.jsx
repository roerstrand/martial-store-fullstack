import { Link } from "react-router-dom";

function Hero({ onToggleMenu }) {
  return (
    <div
      className="apex-hero"
      style={{ backgroundImage: `url(/images/misc/woman_headkick.jpg)` }}
    >
      <Link to="/" className="apex-hero__brand">
        <img
          src="images/logo.png"
          alt="Apex Core"
          className="apex-hero__logo"
        />
        <span className="apex-hero__brand-name">APEX CORE</span>
      </Link>

      <p className="apex-hero__tagline">Fight Gear For Winners</p>
      <p className="apex-hero__subtitle">Premium Equipment For Martial Arts</p>

      <div className="apex-hero__icons">
        <Link to="/favorites" className="apex-hero__icon">
          <img src="/icons/Favorites.png" alt="Favorites" />
        </Link>
        <Link to="/cart" className="apex-hero__icon">
          <img src="/icons/Cart.svg" alt="Cart" />
        </Link>
      </div>

      <button
        className="apex-hero__burger"
        onClick={onToggleMenu}
        aria-label="Menu"
      >
        <img src="/icons/Burger.svg" alt="Menu" />
      </button>
    </div>
  );
}

export default Hero;
