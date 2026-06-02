import { useParams, Link } from "react-router-dom"
import { articles } from "../data/articles"
import "./Pages.css"

function ArticlePage() {
  const { id } = useParams()
  const article = articles.find((a) => a.id === Number(id))

  if (!article) return <p className="loading">Article not found.</p>

  return (
    <div className="article-page">
      <img className="article-page__img" src={article.img} alt={article.title} />
      <div className="article-page__body">
        <h1>{article.title}</h1>
        <p className="article-page__author">by {article.author}</p>
        <div className="article-page__content">
          {article.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <Link to="/" className="auth-btn-secondary" style={{ display: "inline-block", marginTop: "2rem" }}>
          ← BACK TO HOME
        </Link>
      </div>
    </div>
  )
}

export default ArticlePage
