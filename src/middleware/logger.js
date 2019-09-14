/**
 * Log requests
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const logger = (req, res, next) => {
  const data = req.method === 'GET' ? req.originalUrl : req.body;

  try {
    console.log(`${req.method} :: ${new Date().toLocaleString()}: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error(`${Date.now()}: Stringify failed!`);
  }

  next();
};

module.exports = logger;
