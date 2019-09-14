/**
 * External dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/**
 * App config
 */
const config = require('./config');

/**
 * Internal modules
 */
const routeArticle = require('./src/routes/article.route');
const logger = require('./src/middleware/logger');
const cors = require('./src/middleware/cors');

/**
 * Init Express app
 */
const app = express();

/**
 * Use middleware
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);
app.use(cors);

/**
 * Init routes
 */
app.use('/articles', routeArticle);

/**
 * MongoDB connection
 */
mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(() => {
    console.error('DB connection failed.');
    process.exit();
  });

/**
 * Server start
 */
app.listen(config.server.port, () => {
  console.log(`Listening on ${config.server.port} yo!`);
});
