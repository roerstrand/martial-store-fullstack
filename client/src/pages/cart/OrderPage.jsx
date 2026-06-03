import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import { getOrder } from "../../services/orderService";
import "../Pages.css";
import PageNav from "../../components/PageNav";

const STATUS_LABELS = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function OrderPage() {
  const { orderId } = useParams();
  const { data: order, loading, error } = useFetch(() => getOrder(orderId));

  if (loading) return <p className="loading">Loading order...</p>;
  if (error) return <p className="loading">Could not load order.</p>;
  if (!order) return <p className="loading">Order not found.</p>;

  return (
    <div className="confirmation-page">
      <PageNav back="/my-pages" backLabel="Back to My Pages" />
      <p className="confirmation-section-title">Order tracking</p>

      <div className="confirmation-row">
        <span className="confirmation-row__label">Order number</span>
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

      <div className="confirmation-footer" style={{ marginTop: "2rem" }}>
        <Link to="/products" className="confirmation-btn">Continue shopping</Link>
        <Link to="/" className="confirmation-btn confirmation-btn--secondary">Back to home ›</Link>
      </div>
    </div>
  );
}

export default OrderPage;
