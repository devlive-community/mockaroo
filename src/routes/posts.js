const express = require('express');
const router = express.Router();
const {generatePosts} = require('../utils/posts');

// 获取文章列表
router.get('/', (req, res) => {
    // 从查询参数获取 limit，如果没有则默认为 100
    const limit = parseInt(req.query.limit) || 100;

    res.json(generatePosts(limit));
});

module.exports = router;