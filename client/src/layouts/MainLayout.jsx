import { Outlet } from "react-router-dom";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="app">
      <Hero />
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Robin Erik Strandberg. All rights reserved</p>
      </footer>
    </div>
  );
}

export default MainLayout;
