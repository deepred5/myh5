# HTML5 可视化编辑系统
类似易企秀的简易版H5可视化制作工具

## 技术栈

Vue + Node.js + MongoDB

**前端**：

* Vue
* Vuex
* vue-router
* Swiper

**后台**:

* Express
* Mongoose

## 项目结构

前端代码:  `frontend/`文件夹

后台代码: `server/` 文件夹

启动文件: `app.js`

## 安装依赖

```bash
# 进入根目录
cd myh5

# 安装后台依赖
npm install

# 进入前端项目
cd frontend

# 安装前端依赖
npm install
```

## 数据库

数据库配置文件: `server/db/config.js`

```javascript
module.exports = {
    host: 'localhost',
    port: 27017,
    database: 'myh5'
};
```

`database`为数据库名，请确保`myh5`数据库创建成功后再启动后台!

## 启动

```bash
cd myh5

# 启动后台
npm run dev

cd frontend

# 启动前端
npm run dev
```

浏览器访问http://localhost:8081

## 跨域代理

项目采用前后端分离，前端开发时开启一个临时服务器，监听8081端口，后台开发时，监听9099端口。

为使前端可以访问后台提供的api接口，利用vue-cli提供的`proxyTable`进行跨域代理，详见文件`frontend/config/index.js`

```javascript
proxyTable: {
      '/apis': {
        target: 'http://localhost:9099/apis',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
}
```

## 前端打包

```bash
cd frontend
npm run build
```

