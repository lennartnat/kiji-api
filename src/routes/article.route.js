const router = require('express').Router();
const ArticleController = require('../controllers/article.controller');

// 記事追加
router.post('/', ArticleController.createArticle);
// 全取得
router.get('/', ArticleController.retrieveArticles);
// 一件取得
router.get('/:articleId', ArticleController.retrieveArticleById);
// 記事更新
router.put('/:articleId', ArticleController.updateArticle);
// 記事削除
router.delete('/:articleId', ArticleController.deleteArticle);

module.exports = router;
