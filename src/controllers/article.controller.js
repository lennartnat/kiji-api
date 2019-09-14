const Article = require('../models/article.model');

/**
 * HTTP response codes
 */
const STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

/**
 * Create new Article
 *
 * @param {Object} req
 * @param {Object} res
 */
const createArticle = (req, res) => {
  // Extract body
  const { title, content } = req.body;

  // Catch empty article
  if (!title || !content) {
    return res.status(STATUS.BAD_REQUEST).send({ error: 'Title and content cannot be empty!' });
  }

  // 記事生成
  const article = new Article({ title, content });

  // 記事保存
  article
    .save()
    .then(resp => handleResponse(resp, res))
    .catch(err => handleError(err, res));
};

/**
 * Retrieve all articles
 *
 * @param {Object} req
 * @param {Object} res
 */
const retrieveArticles = (req, res) => {
  Article.find()
    .then(resp => handleResponse(resp, res))
    .catch(err => handleError(err, res));
};

/**
 * Retrieve article by ID
 *
 * @param {Object} req
 * @param {Object} res
 */
const retrieveArticleById = (req, res) => {
  Article.findById(req.params.articleId)
    .then(resp => handleResponse(resp, res))
    .catch(err => handleError(err, res));
};

/**
 * Update article
 *
 * @param {Object} req
 * @param {Object} res
 */
const updateArticle = (req, res) => {
  // Extract body
  const { title, content } = req.body;

  // Catch empty article
  if (!title || !content) {
    return res.status(STATUS.BAD_REQUEST).send({ error: 'Title and content cannot be empty!' });
  }

  Article.findByIdAndUpdate(req.params.articleId, { title, content }, { new: true })
    .then(resp => handleResponse(resp, res))
    .catch(err => handleError(err, res));
};

/**
 * Delete article by ID
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteArticle = (req, res) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then(resp => handleResponse(resp, res))
    .catch(err => handleError(err, res));
};

/**
 * Response handler
 *
 * @param {Obj} resp
 * @param {Obj} res
 */
const handleResponse = (resp, res) => {
  if (!resp) {
    return res.status(STATUS.NOT_FOUND).send({ error: `Article not found!` });
  }
  return res.send(resp);
};

/**
 * Error handler
 *
 * @param {Obj} resp
 * @param {Obj} res
 */
const handleError = (error, res) => {
  if (error.kind === 'ObjectId') {
    return res.status(STATUS.NOT_FOUND).send({ error: `Article not found!` });
  }
  return res.status(STATUS.SERVER_ERROR).send(error.message || { error: `Internal server error!` });
};

module.exports = {
  createArticle,
  retrieveArticles,
  retrieveArticleById,
  updateArticle,
  deleteArticle
};
