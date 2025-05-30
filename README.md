### 📘 `README.md` Template – Backend (`news-explorer-api`)

# 📰 NewsExplorer – Backend

This is the backend for the **NewsExplorer** app, built with **Node.js**, **Express**, and **MongoDB**. It handles user registration, login, authentication via JWT, and allows users to save and delete articles.

🌐 **Live API URL**: [https://api.finalproject.crabdance.com/](https://api.finalproject.crabdance.com/)

---

## 🧩 Tech Stack

- **Node.js** – JavaScript runtime
- **Express** – Web server framework
- **MongoDB** + **Mongoose** – Database & ODM
- **bcryptjs** – Password hashing
- **jsonwebtoken** – Token-based authentication
- **express-rate-limit** – Basic rate limiting
- **helmet** – Security headers
- **celebrate/Joi** – Request validation
- **dotenv** – Environment variables
- **cors** – Cross-Origin Resource Sharing
- **winston / express-winston** – Logging

---

## 🛠 API Endpoints

| Method | Endpoint               | Description                    | Auth Required |
|--------|------------------------|--------------------------------|----------------|
| POST   | `/signup`              | Register a new user            | ❌             |
| POST   | `/signin`              | Login a user                   | ❌             |
| GET    | `/articles`            | Get saved articles             | ✅             |
| POST   | `/articles`            | Save a new article             | ✅             |
| DELETE | `/articles/:articleId` | Delete a saved article         | ✅             |
| GET    | `/users/me`            | Get current user profile       | ✅             |
| PATCH  | `/users/me`            | Update user name               | ✅             |

---

## ⚙️ Local Setup Instructions

```bash
# 1. Clone the repo
git clone git@github.com:Dmc4u/news_explorer_api.git
cd news_explorer_api

# 2. Install dependencies
npm install

# 3. Start in dev mode
npm run dev


git clone git@github.com:Dmc4u/news_explorer_api.git
cd news-explorer-api
npm init -y
touch index.js
git init
git add .
git commit -m "Initial commit: backend setup started"

🌿 3. Create and Switch to Stage Branches
git checkout -b stage-2-backend

📤 4. Push to GitHub
git push -u origin stage-2-backend

      ## 📦 Install Production Dependencies
    npm install express mongoose bcryptjs jsonwebtoken express-rate-limit helmet celebrate dotenv cors validator winston express-winston  

    ## This includes:
- express: for creating the web server
- mongoose: for MongoDB database connection
- bcryptjs: for password hashing
- jsonwebtoken: for JWT authentication
- express-rate-limit: for basic security (limiting requests)
- helmet: for setting security headers
- celebrate: for request validation
- dotenv: for environment variables
- cors: for handling Cross-Origin Resource Sharing
 
 ## 🧪 Dev Dependencies
 copy devDependencies from the previous project and run:  npm install.
  "devDependencies": {
  "eslint": "^8.57.1",
  "eslint-config-airbnb-base": "^15.0.0",
  "eslint-config-prettier": "^8.10.0",
  "eslint-plugin-import": "^2.31.0",
  "nodemon": "^3.1.10",
  "prettier": "^2.8.8"
}

## 🧼 Linting and Formatting

# Check for linting issues
npx eslint .

# Auto-fix issues
npx eslint . --fix


 - Create an app.js file in your root directory
 - Add basic Express server setup with:
 - Express initialization
 - Basic middleware (cors, helmet, json parser)
 - A simple test route
 - Server listening on port 3002

 ## Here's a basic structure to get started:

 const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const { PORT = 3002 } = process.env;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from News Explorer API!');
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});


npm run dev


##  Based on the project requirements, we'll need to:
# 🗂 Project Structure
1. Set up the project structure (create directories for):
news_explorer_api/
├── models/         # Mongoose schemas
├── controllers/    # Route handler logic
├── routes/         # API routes
├── middlewares/    # Auth, error handlers, etc.
├── utils/          # Custom classes/utilities
└── .env            # Environment variables

 2. Set up MongoDB connection
 3. Implement user authentication
 4. Create API endpoints for articles

 ## 🔐 Environment Setup

 - Run this on VM: nano .env
 - Generate a secure secret: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
 - Paste your JTW_secret: 
    - NODE_ENV=production
    - JWT_SECRET=your_64_character_secret_here

  # 🔧 Nginx Deployment Guide
     - Run Certbot SSL setup: sudo certbot --nginx -d finalproject.crabdance.com -d www.finalproject.crabdance.com -d api.finalproject.crabdance.com

   ### Nginx Management Commands:

   # Check Nginx config
      sudo nginx -t

   # View full configuration
      sudo nginx -T

   # View current site config
      sudo cat /etc/nginx/sites-available/default
  or:  sudo nano /etc/nginx/sites-available/final-project

   # Reload Nginx
      sudo systemctl reload nginx

   # Check available certificate
     sudo certbot certificates   

   # View logs
     sudo tail -f /var/log/nginx/error.log
     sudo tail -f /var/log/nginx/access.log
  
 # 🧠 Pro Tips
   - Never commit your .env file — add it to .gitignore

   - Always restart PM2 after editing environment variables:pm2 restart final-project

 ## 🔗 My Profiles

- 📁 GitHub: [https://github.com/Dmc4u/](https://github.com/Dmc4u/)
- 💼 LinkedIn: [https://www.linkedin.com/in/moses-ademola-aina-a42652151/](https://www.linkedin.com/in/moses-ademola-aina-a42652151/)
