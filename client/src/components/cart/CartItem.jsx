import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const [, , removeFromCart] = useCart();

  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={`/images/products/${item.product.image}`}
        alt={item.product.title}
      />
      <div className="cart-item__details">
        <p className="cart-item__name">{item.product.title}</p>
        <div className="cart-item__row">
          <span className="cart-item__meta-label">Size</span>
          <span className="cart-item__badge">{item.size}</span>
          <span className="cart-item__meta-label" style={{ marginLeft: "0.5rem" }}>Qty</span>
          <span className="cart-item__badge">{item.quantity}</span>
        </div>
        <div className="cart-item__row">
          <span className="cart-item__price">{item.product.price * item.quantity} EUR</span>
          <button
            className="cart-item__remove"
            onClick={() => removeFromCart(item.product._id, item.size)}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
