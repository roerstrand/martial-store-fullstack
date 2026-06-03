import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import "../pages/Pages.css";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart] = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Hero onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <Navbar isOpen={menuOpen} onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      {cartCount > 0 && (
        <div className="ml-cart-bar">
          <span className="ml-cart-bar__text">{cartCount} {cartCount === 1 ? "item" : "items"} in cart</span>
          <Link to="/cart" className="ml-cart-bar__btn">View Cart ›</Link>
          <Link to="/checkout" className="ml-cart-bar__btn">Checkout ›</Link>
        </div>
      )}
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
