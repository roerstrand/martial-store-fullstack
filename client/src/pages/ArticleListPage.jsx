import { useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.jsx";
import { getArticles } from "../services/articleService";
import "./Pages.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ArticleListPage() {
  const { data: raw, loading, error } = useFetch(getArticles);
  const articles = useMemo(() => raw ? shuffle(raw) : [], [raw]);

  if (loading) return <p className="loading">Loading stories...</p>;
  if (error) return <p className="loading">Could not load articles.</p>;

  return (
    <div className="articles-page">
      <div className="articles-header">
        <h1>Stories</h1>
        <span className="articles-count">{articles.length} articles</span>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/articles/${article._id}`}
            className="article-list-card"
          >
            <div className="article-list-card__img-wrap">
              {article.image ? (
                <img
                  src={`/images/articles/${article.image}`}
                  alt={article.title}
                  loading="lazy"
                />
              ) : (
                <div className="article-list-card__no-img" />
              )}
              <span className="article-list-card__category">{article.category}</span>
            </div>
            <div className="article-list-card__body">
              <h2 className="article-list-card__title">{article.title}</h2>
              {article.excerpt && (
                <p className="article-list-card__excerpt">{article.excerpt}</p>
              )}
              <span className="article-list-card__author">by {article.author}</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ padding: "0 1.5rem 2rem" }}>
        <Link to="/" className="auth-btn-secondary">← BACK TO HOME</Link>
      </div>
    </div>
  );
}

export default ArticleListPage;
