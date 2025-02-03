const express = require('express');
const routes = require('./routes');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 路由
app.use('/', routes);

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});