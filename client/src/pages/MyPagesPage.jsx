import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getMyOrders } from "../services/orderService";
import useFetch from "../hooks/useFetch.jsx";
import "./Pages.css";

const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function MyPagesPage() {
  const { data: user, loading: userLoading } = useFetch(getCurrentUser);
  const { data: orders, loading: ordersLoading } = useFetch(getMyOrders);

  return (
    <div className="my-pages-page">
      <h1>My Pages</h1>

      <section className="my-pages-section">
        <p className="confirmation-section-title">Account</p>
        {userLoading ? (
          <p className="loading">Loading...</p>
        ) : user ? (
          <>
            <div className="confirmation-row">
              <span className="confirmation-row__label">Name</span>
              <span>{user.name}</span>
            </div>
            <div className="confirmation-row">
              <span className="confirmation-row__label">Email</span>
              <span>{user.email}</span>
            </div>
          </>
        ) : null}
      </section>

      <section className="my-pages-section">
        <p className="confirmation-section-title">Order history</p>
        {ordersLoading ? (
          <p className="loading">Loading orders...</p>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="my-pages-order">
              <div className="confirmation-row">
                <span className="confirmation-row__label">Order</span>
                <span>{order._id}</span>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-row__label">Status</span>
                <span>{STATUS_LABELS[order.status] ?? order.status}</span>
              </div>
              <div className="confirmation-row">
                <span className="confirmation-row__label">Total</span>
                <span>{order.totalPrice} EUR</span>
              </div>
              <Link to={`/orders/${order._id}`} className="my-pages-order__link">
                Track order
              </Link>
            </div>
          ))
        ) : (
          <p className="favorites-empty">No orders yet</p>
        )}
      </section>
    </div>
  );
}

export default MyPagesPage;
