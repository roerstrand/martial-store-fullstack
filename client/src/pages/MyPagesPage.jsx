import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { getMyOrders } from "../services/orderService";
import useFetch from "../hooks/useFetch.jsx";
import "./Pages.css";

const STATUS_LABELS = {
  pending:    "Pending",
  processing: "Processing",
  shipped:    "Shipped",
  delivered:  "Delivered",
  cancelled:  "Cancelled",
};

function MyPagesPage() {
  const { data: user, loading: userLoading } = useFetch(getCurrentUser);
  const { data: orders, loading: ordersLoading } = useFetch(getMyOrders);

  return (
    <div className="my-pages-page">

      <div className="my-pages-header">
        <p className="my-pages-header__eyebrow">Member account</p>
        {userLoading ? (
          <p className="loading" style={{ padding: 0 }}>Loading...</p>
        ) : user ? (
          <>
            <p className="my-pages-header__name">{user.name}</p>
            <p className="my-pages-header__email">{user.email}</p>
          </>
        ) : null}
      </div>

      <div className="my-pages-body">

        <section className="my-pages-section">
          <p className="my-pages-section__title">Order History</p>

          {ordersLoading ? (
            <p className="loading">Loading orders...</p>
          ) : orders && orders.length > 0 ? (
            <div className="my-pages-table">
              <div className="my-pages-table__head">
                <span>Order</span>
                <span>Status</span>
                <span>Total</span>
                <span />
              </div>
              {orders.map((order) => (
                <div key={order._id} className="my-pages-table__row">
                  <span className="my-pages-table__id">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className={`my-pages-table__status my-pages-table__status--${order.status}`}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                  <span className="my-pages-table__total">
                    {order.totalPrice} EUR
                  </span>
                  <Link to={`/orders/${order._id}`} className="my-pages-table__link">
                    Track ›
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="my-pages-empty">
              <p>No orders placed yet.</p>
              <Link to="/products" className="auth-btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
                SHOP NOW ›
              </Link>
            </div>
          )}
        </section>

      </div>

      <div className="my-pages-footer">
        <Link to="/" className="auth-btn-secondary">BACK TO HOME ›</Link>
      </div>
    </div>
  );
}

export default MyPagesPage;
