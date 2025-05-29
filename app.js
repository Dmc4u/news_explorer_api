require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require("celebrate");
const rateLimiter = require("./middlewares/rateLimiter");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  logValidationErrors,
} = require("./middlewares/validation");

const app = express();
// ✅ Use correct DB name and allow env override
const { PORT = 3002, MONGO_URL = "mongodb://127.0.0.1:27017/news-explorer_db" } = process.env;

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on("error", (err) =>
  console.error("MongoDB connection lost:", err)
);

// Middlewares
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);

// Public routes
app.post("/signup", createUser);
app.post("/signin", login);

app.get('/test', (req, res) => {
  res.json({ message: 'Server is reachable!' });
});

// Protected routes
app.use(auth);
app.use("/", mainRouter);

// Centralized error handling
// ✅ Correct order
app.use(logValidationErrors);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);



app.listen(PORT, '0.0.0.0', () => {
  console.log(`App listening at port ${PORT}`);
});
