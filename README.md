# Mockaroo

一个轻量级的 HTTP Mock 服务器，用于快速构建模拟数据接口，适用于前端开发和接口测试场景。

## 特性

- 🚀 快速启动，零配置
- 📝 支持自定义响应数据
- ⏱ 模拟网络延迟
- 🔄 动态数据生成
- 💾 支持保存和复用 Mock 配置
- 🌐 支持 RESTful API
- 📊 内置常用数据模板

## 安装

```bash
npm install mockaroo
```

或者使用 yarn：

```bash
yarn add mockaroo
```

## 快速开始

1. 创建配置文件 `mock.config.js`：

```javascript
module.exports = {
  port: 3000,
  routes: {
    '/api/users': {
      method: 'GET',
      response: {
        code: 200,
        data: [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' }
        ]
      }
    }
  }
};
```

2. 启动服务：

```bash
npx mockaroo start
```

## 高级配置

### 动态数据

支持使用模板函数生成动态数据：

```javascript
{
  '/api/random': {
    method: 'GET',
    response: () => ({
      id: Math.random(),
      timestamp: Date.now()
    })
  }
}
```

### 延迟响应

模拟网络延迟：

```javascript
{
  '/api/slow': {
    method: 'GET',
    delay: 2000, // 延迟 2 秒
    response: { message: 'Slow response' }
  }
}
```

### 条件响应

根据请求参数返回不同响应：

```javascript
{
  '/api/conditional': {
    method: 'POST',
    handler: (req) => {
      if (req.body.type === 'error') {
        return {
          status: 500,
          response: { error: 'Server Error' }
        };
      }
      return {
        status: 200,
        response: { message: 'Success' }
      };
    }
  }
}
```

## API 文档

### CLI 命令

- `mockaroo start`: 启动 mock 服务器
- `mockaroo init`: 创建配置文件模板
- `mockaroo --help`: 显示帮助信息

### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| port | number | 3000 | 服务器端口 |
| host | string | 'localhost' | 服务器主机 |
| cors | boolean | true | 是否允许跨域 |
| delay | number | 0 | 全局延迟（毫秒） |

## 贡献指南

欢迎提交 Issue 和 Pull Request！在提交 PR 之前，请确保：

1. 代码通过测试
2. 更新相关文档
3. 遵循现有的代码风格

## 许可证

MIT