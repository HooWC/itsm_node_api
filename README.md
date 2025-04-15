# ITSM API

ITSM API是一个基于Node.js和Express框架开发的RESTful API服务。

## 项目结构

```
ITSM_api/
├── _helpers/           # 助手函数
│   └── db.js           # 数据库连接
├── _middleware/        # 中间件
│   ├── authorize.js    # JWT授权
│   ├── error-handler.js# 错误处理
│   └── validate-request.js # 请求验证
├── users/              # 用户相关API
│   └── users.controller.js # 用户控制器
├── app/                # 应用相关目录
├── config.json         # 配置文件
├── package.json        # 项目依赖
├── README.md           # 项目说明
└── server.js           # 服务器入口
```

=====
Note:
Old Secret:2a521419-2fb1-4f14-838f-7bb140940559 dad2fea6-1a49-48e8-8631-4f23cdf5ce60 374ebe1e-84ff-4a4a-a6c6-102df665199f
=====


## 安装与运行

### 安装依赖
```
npm install
```

### 开发环境运行
```
npm run dev
```

### 生产环境运行
```
npm start
```

## API端点

- **GET /** - 欢迎页面
- **GET /home** - 检查API运行状态
- **POST /users/authenticate** - 用户登录
- **GET /users** - 获取所有用户 (需授权)
- **GET /users/current** - 获取当前用户 (需授权)
- **GET /users/:id** - 根据ID获取用户 (需授权)

## 授权

API使用JWT (JSON Web Token) 进行授权，请求时需要在Header中包含：
```
Authorization: Bearer {token}
``` 