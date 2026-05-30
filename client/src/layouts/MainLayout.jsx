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
        <p>&copy; 2026 Robin Erik Strandberg. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
