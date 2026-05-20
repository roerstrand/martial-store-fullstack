const asyncHandler = require("express-async-handler");
const { getArticlesService, getArticleService } = require("../services/articleService");

// @desc GET articles, supports ?category=bjj&random=true&limit=3
// @route GET /api/articles
// @access public
const getArticles = asyncHandler(async (req, res) => {
  const { category, random, limit } = req.query;
  const articles = await getArticlesService(category, random, limit);
  res.status(200).json(articles);
});

// @desc GET one article by id
// @route GET /api/articles/:id
// @access public
const getArticle = asyncHandler(async (req, res) => {
  const article = await getArticleService(req.params.id);
  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }
  res.status(200).json(article);
});

module.exports = { getArticles, getArticle };
