const express = require('express');
const router = express.Router();
const {generatePosts} = require('../utils/posts');

// 获取文章列表
router.get('/', (req, res) => {
    // 从查询参数获取 limit，如果没有则默认为 100
    const limit = parseInt(req.query.limit) || 100;

    // 生成文章数据
    const posts = generatePosts(limit);

    // 返回响应
    res.json({
        code: 200,
        message: 'success',
        data: posts
    });
});

module.exports = router;