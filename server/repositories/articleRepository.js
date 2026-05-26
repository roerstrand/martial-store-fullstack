const Article = require("../models/articleModel");

const getAllArticles = async (filter = {}, options = {}) => {
  if (options.random) {
    // Om random satt på options, mongoDB pipeline init
    const pipeline = [];
    if (Object.keys(filter).length > 0) pipeline.push({ $match: filter });
    pipeline.push({ $sample: { size: options.limit || 3 } });
    return await Article.aggregate(pipeline);
  }
  return await Article.find(filter);
};

const getArticle = async (id) => {
  return await Article.findById(id);
};

module.exports = { getAllArticles, getArticle };
