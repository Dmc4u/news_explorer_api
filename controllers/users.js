const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

// 🔐 Get current user (protected route)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => Promise.reject(new NotFoundError("User not found")))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid ID format"));
      } else {
        next(err);
      }
    });
};

// 🆕 Create user (signup)
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequestError("Name, email, and password are required"));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("User with this email already exists"));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError("Validation failed"));
      } else {
        next(err);
      }
    });
};

// 🔓 Login
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

// ✏️ Update user name
const updateUser = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new BadRequestError("Name is required"));
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true }
  )
    .orFail(() => Promise.reject(new NotFoundError("User not found")))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      delete userObj.email;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation failed"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};
