const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');

// 配置临时目录存储
const tempStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, os.tmpdir()) // 使用系统临时目录
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
});

// 不限制类型的上传
const uploadAny = multer({
    storage: tempStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB 限制
    }
});

// 限制文件类型的上传
const uploadWithFilter = multer({
    storage: tempStorage,
    fileFilter: (req, file, cb) => {
        // 接受的文件类型
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('不支持的文件类型。仅支持图片、PDF和Word文档。'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB 限制
    }
});

// 不限制类型的单文件上传
router.post('/', uploadAny.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                message: '没有上传文件'
            });
        }

        res.json({
            code: 200,
            message: '文件上传成功',
            data: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: '文件上传失败',
            error: error.message
        });
    }
});

// 不限制类型的多文件上传
router.post('/multiple', uploadAny.array('files', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                code: 400,
                message: '没有上传文件'
            });
        }

        res.json({
            code: 200,
            message: '文件上传成功',
            data: req.files.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype
            }))
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: '文件上传失败',
            error: error.message
        });
    }
});

// 限制类型的单文件上传
router.post('/filter', uploadWithFilter.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                message: '没有上传文件'
            });
        }

        res.json({
            code: 200,
            message: '文件上传成功',
            data: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: '文件上传失败',
            error: error.message
        });
    }
});

// 限制类型的多文件上传
router.post('/multiple/filter', uploadWithFilter.array('files', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                code: 400,
                message: '没有上传文件'
            });
        }

        res.json({
            code: 200,
            message: '文件上传成功',
            data: req.files.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype
            }))
        });
    }
    catch (error) {
        res.status(500).json({
            code: 500,
            message: '文件上传失败',
            error: error.message
        });
    }
});

// 错误处理中间件
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Multer 错误处理
        res.status(400).json({
            code: 400,
            message: '文件上传错误',
            error: error.message
        });
    }
    else {
        // 其他错误处理
        res.status(500).json({
            code: 500,
            message: '服务器错误',
            error: error.message
        });
    }
});

module.exports = router;