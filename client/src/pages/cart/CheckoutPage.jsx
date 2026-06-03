import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import PaymentForm from "../../components/cart/PaymentForm";
import KlarnaModal from "../../components/cart/KlarnaModal";
import { createOrder } from "../../services/orderService";
import "../Pages.css";
import PageNav from "../../components/PageNav";

const SHIPPING_COSTS = { standard: 5, express: 19, pickup: 0 };

function CheckoutPage() {
  const [cart, , , clearCart] = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleFormSubmit = ({ shipping, ...shippingInfo }) => {
    const shippingCost = SHIPPING_COSTS[shipping] ?? 5;
    setPendingData({ shipping, shippingCost, shippingInfo, totalPrice: subtotal + shippingCost });
  };

  const handleConfirmPayment = async () => {
    if (!pendingData) return;
    const { shipping, shippingCost, shippingInfo, totalPrice } = pendingData;
    const products = cart.map((item) => ({
      product_id: item.product._id,
      price: item.product.price,
      size: item.size,
      quantity: item.quantity,
    }));
    const order = await createOrder(products, totalPrice);
    const cartSnapshot = [...cart];
    await clearCart();
    setPendingData(null);
    navigate("/confirmation", {
      state: { order, shippingInfo, shipping, shippingCost, cartSnapshot },
    });
  };

  return (
    <div className="checkout-page">
      <PageNav back="/cart" backLabel="Back to Cart" />
      <div className="flow-breadcrumb">
        <span>CART</span>
        <span>=›</span>
        <span className="flow-breadcrumb__step--active">CHECKOUT</span>
        <span>=›</span>
        <span>CONFIRMATION</span>
      </div>

      {pendingData && (
        <KlarnaModal
          total={pendingData.totalPrice}
          onConfirm={handleConfirmPayment}
          onClose={() => setPendingData(null)}
        />
      )}

      <div className="checkout-layout">
        <PaymentForm onSubmit={handleFormSubmit} />

        <div className="checkout-summary">
          <p className="checkout-section-title">Your order</p>
          {cart.map((item, i) => (
            <div
              key={`${item.product._id}-${item.size}-${i}`}
              className="checkout-summary__item"
            >
              <p className="checkout-summary__item-name">
                {item.product.title}{item.size ? ` (${item.size})` : ""}
              </p>
              <div className="checkout-summary__item-row">
                <span>Quantity: {item.quantity}</span>
                <span>{item.product.price * item.quantity} EUR</span>
              </div>
            </div>
          ))}
          <p className="checkout-summary__subtotal">{subtotal} EUR</p>

          <div className="checkout-trust">
            <span>Secure Payment ✓</span>
            <span>Fast Delivery ✓</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="checkout-submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Complete Order"}
          </button>

          <p className="checkout-redirect-note">
            You will be redirected to your payment provider — Stripe, Klarna or Swish — to complete your purchase securely.
          </p>

          <Link to="/cart" className="auth-btn-secondary">
            BACK TO CART ›
          </Link>
          <Link to="/" className="auth-btn-secondary">
            BACK TO HOME ›
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
