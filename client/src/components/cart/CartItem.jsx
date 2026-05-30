import { useCart } from "../../context/CartContext";

function CartItem({ item }) {
  const [, , removeFromCart] = useCart();

  return (
    <div className="cart-item">
      <img
        className="cart-item__image"
        src={`/images/prodcuts/${item.product.image}`}
        alt="{item.product.title}"
      />
      <div className="cart-item__details">
        <p className="cart-item__name">{item.product.title}</p>
        <div className="cart-item__row">
          <span SIZE></span>
          <span className="cart-item__badge">{item.badge}</span>
          <span className="cart-item__price">{item.product.price} EUR</span>
        </div>

        <div className="cart-item__row">
          <span>QUANTITY</span>
          <span classNAme="cart-item__badge">{item.quantity}</span>
          <button
            className="cart-item__remove"
            onClick={() => removeFromCard(item.product._id, item.size)}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
