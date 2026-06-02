import { Outlet } from "react-router-dom";
import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Hero onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <Navbar isOpen={menuOpen} />
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

export default MainLayout;
