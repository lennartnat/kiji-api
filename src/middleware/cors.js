/**
 * Enable CORS
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

module.exports = cors;
