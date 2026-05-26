const { getAllArticles, getArticle } = require("../repositories/articleRepository");

const getAllArticlesService = async () => {
  return await getAllArticles();
};

const getArticlesService = async (category, random, limit) => {
  const filter = category ? { category } : {};
  const options = { random: random === "true", limit: parseInt(limit) || 3 };
  return await getAllArticles(filter, options);
};

const getArticleService = async (id) => {
  return await getArticle(id);
};

module.exports = { getAllArticlesService, getArticlesService, getArticleService };
