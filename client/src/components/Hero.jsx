import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="apex-hero"
      style={{ backgroundImage: `url(/images/misc/woman_headkick.jpg)` }}
    >
      <div className="apex-hero__brand">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Apex Core"
            className="apex-hero__logo"
          />
          <span className="apex-hero__brand-name">Apex Core</span>
        </Link>
      </div>

      <p className="apex-hero__tagline">Fight Gear For Winners</p>

      <Link to="/cart" className="apex-hero__cart">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </Link>
    </div>
  );
}

export default Hero;
