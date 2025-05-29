
---

### 📘 `README.md` Template – Backend (`news-explorer-api`)

```markdown
# NewsExplorer – Backend

This is the backend for the NewsExplorer app, built with Node.js, Express, and MongoDB. It handles user authentication and article storage.

## 🧩 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Celebrate/Joi (validation)

## 🛠 API Endpoints

- `POST /signup` – Register new users
- `POST /signin` – Login users
- `GET /articles` – Get saved articles (auth required)
- `POST /articles` – Save an article
- `DELETE /articles/:id` – Remove an article

## ⚙️ Setup

```bash
npm install
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

      ## ⚙️ Installing the core dependencies
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
 
 npm install nodemon --save-dev  Or
 copy devDependencies from the previous project and run:  npm install.
  "devDependencies": {
    "eslint": "^8.57.1",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-config-prettier": "^8.10.0",
    "eslint-plugin-import": "^2.31.0",
    "nodemon": "^3.1.10",
    "prettier": "^2.8.8"
  }

    ## eslint status     
     run: npx eslint .
    ## Auto fix
     run:  npx eslint . --fix

     ## SSL certificate
     run: sudo certbot --nginx -d finalproject.crabdance.com -d www.finalproject.crabdance.com  -d api.finalproject.crabdance.com 


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

1. Set up the project structure (create directories for):
 news_explorer_api/
├── models/         (for MongoDB schemas)
├── controllers/    (for route handlers)
├── routes/         (for API routes)
├── middlewares/    (for custom middleware)
├── utils/          (for helper functions)
└── .env            (for environment variables)

 2. Set up MongoDB connection
 3. Implement user authentication
 4. Create API endpoints for articles

 ## How to generate a strong JWT_SECRET
  - Generate one directly in your terminal:
  Run:  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
 
 ## Next steps to consider:
On your production server: You'll create that .env file with:

NODE_ENV=production
JWT_SECRET=your_64_character_secret_here

For development: Your code will work without the .env file using the fallback values in config.js

## SSH into your server and run:
nano .env in VM 

paste: NODE_ENV=production
JWT_SECRET=your_64_character_secret_here    //change your_64_character_secret_here TO the generated the JWT_SECRET.

 
## Nginx server blocks

Here are some useful commands to check your Nginx server:

To check Nginx configuration syntax:
bash
sudo nginx -t

This will tell you if there are any syntax errors in your configuration files.

To see the current Nginx configuration:
bash
sudo nginx -T

This shows the entire configuration that Nginx is currently using.

sudo cat /etc/nginx/sites-available/default

To check Nginx status:
bash
sudo systemctl status nginx

To view Nginx error logs:
bash
sudo tail -f /var/log/nginx/error.log

To view Nginx access logs:
bash
sudo tail -f /var/log/nginx/access.log

To list your site configurations:
bash
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/

To edit
sudo nano /etc/nginx/sites-available/final-project
ctrl + x
y press enter.

sudo nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful

To reload 
sudo systemctl reload nginx

