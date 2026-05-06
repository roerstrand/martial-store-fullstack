import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Apex Core</h2>

        <div className="nav-links">
          <Link to="/">Hem</Link>
          <Link to="/products/ProductList">Products</Link>
        </div>
      </nav>

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