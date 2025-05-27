const express = require("express");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/articles");
const { validateArticleBody, validateId } = require("../middlewares/validation");

const router = express.Router();

router.get("/", getArticles);             // GET /articles
router.post("/", validateArticleBody, createArticle);          // POST /articles
router.delete("/:articleId", validateId, deleteArticle); // DELETE /articles/:articleId

module.exports = router;
