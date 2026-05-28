import { useFavorites } from "../../context/FavoriteContext";

function FavoriteItem({ product }) {
  const [toggleFavorites] = useFavorites();

  return (
    <div>
      <img src={product.image} alt={product.title} />
      <p>{product.title}</p>
      <p>{product.price}</p>
      <button onClick={() => toggleFavorites(product)}>Remove</button>
    </div>
  );
}

export default FavoriteItem;
