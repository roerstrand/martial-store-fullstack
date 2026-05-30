import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import "../Pages.css";

function CartPage() {
  const [cart] = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = 19;
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <div className="flow-breadcrumb">
        <span className="flow-breadcrumb__step--active">CART</span>
        <span>=›</span>
        <span>CHECKOUT</span>
        <span>=›</span>
        <span>CONFIRMATION</span>
      </div>

      <h1>YOUR CART</h1>

      <div className="cart-items">
        {cart.map((item, index) => (
          <CartItem
            key={`${item.product._id}-${item.size}-${index}`}
            item={item}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary__row">
          <span className="cart-summary__label">SUBTOTAL</span>
          <span>{subtotal} EUR</span>
        </div>
        <div className="cart-summary__row">
          <span className="cart-summary__label">SHIPPING</span>
          <span>{shipping} EUR</span>
        </div>
        <div className="cart-summary__row">
          <span className="cart-summary__label">TOTAL</span>
          <span>{total} EUR</span>
        </div>
      </div>

      <button
        className="cart-checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        CHECKOUT
      </button>
      <Link to="/products" className="auth-btn-secondary">
        ALL PRODUCTS ›
      </Link>
      <Link to="/" className="auth-btn-secondary">
        BACK TO HOME ›
      </Link>
    </div>
  );
}

export default CartPage;
