import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import PrivateRoute from "./components/PrivateRoute";

import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/products/ProductListPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import OrderConfirmationPage from "./pages/cart/OrderConfirmationPage";
import OrderPage from "./pages/cart/OrderPage";
import MyPagesPage from "./pages/MyPagesPage";
import ArticlePage from "./pages/ArticlePage";
import ArticleListPage from "./pages/ArticleListPage";
import InfoPage from "./pages/InfoPage";
import AdminPage from "./pages/admin/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<MinimalLayout />}>
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/articles" element={<ArticleListPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/info/:slug" element={<InfoPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<OrderConfirmationPage />} />
            <Route path="/orders/:orderId" element={<OrderPage />} />
            <Route path="/my-pages" element={<MyPagesPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
