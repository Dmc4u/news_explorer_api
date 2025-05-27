const express = require("express");
const userRouter = require("./users");
const articleRouter = require("./articles");
const { NotFoundError } = require("../utils/errors");

const router = express.Router();

router.use("/users", userRouter);
router.use("/articles", articleRouter);

// Handle non-existent routes
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
