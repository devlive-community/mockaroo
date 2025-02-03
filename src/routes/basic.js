const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({status: 'Mockaroo server is running'});
});

// 基础的健康检查接口
router.get('/health', (req, res) => {
    res.json({status: 'ok'});
})

module.exports = router;