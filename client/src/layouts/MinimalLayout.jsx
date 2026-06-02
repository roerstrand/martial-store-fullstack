import { Outlet, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";

function MinimalLayout() {
  const [cart] = useCart();
  const [, favorites] = useFavorites();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  return (
    <div className="app">
      <header className="minimal-header">
        <Link to="/" className="minimal-header__brand">
          <img src="/images/logo.png" alt="Apex Core" className="minimal-header__logo" />
          <span className="minimal-header__brand-name">APEX CORE</span>
        </Link>
        <div className="minimal-header__icons">
          <Link to="/favorites" className="minimal-header__icon">
            <img src="/icons/Favorites.png" alt="Favorites" />
            <span className="minimal-header__badge">{favCount}</span>
          </Link>
          <Link to="/cart" className="minimal-header__icon">
            <img src="/icons/Cart.svg" alt="Cart" />
            <span className="minimal-header__badge">{cartCount}</span>
          </Link>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer__brand">Apex Core</div>
        <p className="footer__tagline">Train hard. Fight smart.</p>
        <div className="footer__divider" />
        <p className="footer__copy">&copy; 2026 Robin Erik Strandberg. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MinimalLayout;
