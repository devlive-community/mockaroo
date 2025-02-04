const express = require('express');
const router = express.Router();
const {generatePosts, generatePost} = require('../utils/posts');

router.get('/', (req, res) => {
    // 从查询参数获取 limit，如果没有则默认为 100
    const limit = parseInt(req.query.limit) || 100;

    res.json(generatePosts(limit));
});

router.get('/:id', (req, res) => {
    res.json(generatePost(req.params.id));
});

router.post('/', (req, res) => {
    res.json(generatePost(req.body));
});

router.put('/:id', (req, res) => {
    res.json(generatePost(req.body));
});

router.delete('/:id', (req, res) => {
    res.json(generatePost(req.params.id));
});

router.patch('/:id', (req, res) => {
    res.json(generatePost(req.body));
});

module.exports = router;