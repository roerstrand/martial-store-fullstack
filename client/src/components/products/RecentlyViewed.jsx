import { Link } from "react-router-dom";

function RecentlyViewed({ items, currentId }) {
  const visible = items.filter(p => p._id !== currentId);
  if (visible.length === 0) return null;

  return (
    <div className="recently-viewed">
      <p className="recently-viewed__title">Recently Viewed</p>
      <div className="recently-viewed__row">
        {visible.map(product => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="recently-viewed__card"
          >
            <div className="recently-viewed__img-wrap">
              <img
                src={`/images/products/${product.image}`}
                alt={product.title}
                loading="lazy"
              />
            </div>
            <div className="recently-viewed__info">
              <p className="recently-viewed__name">{product.title}</p>
              <p className="recently-viewed__price">{product.price} EUR</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;
