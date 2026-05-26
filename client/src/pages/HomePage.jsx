import React from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

// Statiska produkter för startsidan — ersätts med API-data senare
const featuredProducts = [
  { id: 1, title: "BJJ GI", price: 79, img: "/images/products/bjj_gi.jpg" },
  { id: 2, title: "BOX KIT", price: 29, img: "/images/products/womens_boxing_startkit.jpg" },
  { id: 3, title: "SHIN GUARDS", price: 39, img: "/images/products/shin_guards.jpg" },
  { id: 4, title: "BOXING BAG", price: 199, img: "/images/products/boxing_bag.jpg" },
];

// Statiska artiklar — ersätts med API-data senare
const articles = [
  { id: 1, title: "My Road to a Black Belt", author: "Jon Doe", img: "/images/articles/road_to_blackbelt.jpg" },
  { id: 2, title: "How My Role Models Inspired Me", author: "Chen Gracie", img: "/images/articles/how_my_rolemodels_inspired_me.jpg" },
  { id: 3, title: "Finish the Sweep", author: "Sergey Meregali", img: "/images/articles/tips_for_finishing_the_sweep.jpg" },
];

function HomePage() {
  return (
    <div className="home-page">

      {/* Produktgrid */}
      <section className="home-products">
        <div className="home-products__grid">
          {featuredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="home-product-card">
              <div className="home-product-card__img-wrap">
                <img src={product.img} alt={product.title} />
                <span className="home-product-card__fav">♡</span>
              </div>
              <span className="home-product-card__label">{product.title} {product.price}£</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Artikelsektion */}
      <section className="home-articles">
        <div className="home-articles__header">
          <span>READ ARTICLES FROM THE PROS</span>
          <Link to="/articles" className="home-articles__btn">›</Link>
        </div>
        <div className="home-articles__grid">
          {articles.map((article) => (
            <div key={article.id} className="home-article-card">
              <img src={article.img} alt={article.title} />
              <p className="home-article-card__title">{article.title}</p>
              <p className="home-article-card__author">by {article.author}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;
