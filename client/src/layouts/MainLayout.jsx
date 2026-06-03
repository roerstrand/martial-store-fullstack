import { Outlet } from "react-router-dom";
import { useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <Hero onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <Navbar isOpen={menuOpen} onToggleMenu={() => setMenuOpen((prev) => !prev)} />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
