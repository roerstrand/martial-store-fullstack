import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../pages/Pages.css";

function CartToast() {
  const [,,,,,,,toast] = useCart();
  if (!toast) return null;

  return (
    <div className="cart-toast">
      <span className="cart-toast__text">
        Added to cart
      </span>
      <Link to="/cart" className="cart-toast__link">View Cart ›</Link>
    </div>
  );
}

export default CartToast;
