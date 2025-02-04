const express = require('express');
const router = express.Router();
const {generatePosts, generatePost} = require('../utils/posts');

// 获取文章列表
router.get('/', (req, res) => {
    // 从查询参数获取 limit，如果没有则默认为 100
    const limit = parseInt(req.query.limit) || 100;

    res.json(generatePosts(limit));
});

// 获取单个文章
router.get('/:id', (req, res) => {
    res.json(generatePost(req.params.id));
});

// 创建文章
router.post('/', (req, res) => {
    res.json(generatePost(req.body));
});

// 更新文章
router.put('/:id', (req, res) => {
    res.json(generatePost(req.body));
});

module.exports = router;