const Article = require("../models/article");
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/errors");

// GET /articles - Return articles saved by the user
const getArticles = (req, res, next) =>
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);

// POST /articles - Save a new article
const createArticle = (req, res, next) => {
  const { keyword, title, description, publishedAt, source, urlToImage } = req.body;
  const owner = req.user._id;

  if (!keyword || !title || !description || !publishedAt || !source?.name || !urlToImage) {
    return next(new BadRequestError("All fields are required"));
  }

  return Article.create({ keyword, title, description, publishedAt, source, urlToImage, owner })
    .then((article) => res.status(201).send(article))
    .catch(next);
};

// DELETE /articles/:articleId - Remove a saved article
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  return Article.findById(articleId)
    .orFail(() => new NotFoundError("Article not found"))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        throw new ForbiddenError("You can only delete your own articles");
      }
      return article.deleteOne();
    })
    .then(() => res.status(200).send({ message: "Article deleted" }))
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};