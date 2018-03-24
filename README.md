# 简介

Xialiao(瞎聊) 是一个基于React的single-page application (SPA)社交应用，使用野狗(Wilddog)/Frirebase作为实时后端数据库。主要功能包括新鲜事推送和即时站内信

<br>

# 功能

- [√] 用户注册，登陆，登出
- [√] 注册用户搜索
- [√] 主页
- [√] 发布新鲜事
- [√] 回复新鲜事
- [√] 查看用户历史发布
- [√] 新鲜事点赞，取消点赞，点赞统计
- [√] 发送站内信
- [√] 站内信即时推送
- [√] 站内信未读通知
- [√] 站内信回复

<br>

# 技术栈

* [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库。
* [React Router](https://reacttraining.com/react-router/web/guides/philosophy) - 声明式 React 路由解决方案。
* [Redux](https://redux.js.org/) - JavaScript 状态容器，提供可预测化的状态管理。
* [Redux Persist](https://github.com/rt2zz/redux-persist) - Redux 状态存储和重构方案。
* [Redux Thunk](https://github.com/gaearon/redux-thunk) - Redux 中间层，实现异步的 action dispatch。
* [Semantic UI React](https://react.semantic-ui.com/introduction) - Semantic UI 对于 React 的集成方案。
* [野狗(Wilddog)](https://react.semantic-ui.com/introduction) - 提供实时数据库服务
* [Webpack](https://webpack.js.org/) - 模块打包器
* [Babel](https://babeljs.io/) - JavaScript 编译器，允许用户使用最新的 JavaScript 特性。
* [ESLint](https://eslint.org/) - JavaScript 代码检测工具，帮助统一代码风格避免简单错误。 

<br>

# 运行

```
git clone https://github.com/Willchenwy/xialiao.git
cd xialiao
```


### 安装依赖
```
npm install
```
注意⚠️：请根据需要修改Wilddog(野狗)配置，默认配置有访问流量限制在到达上限时会造成数据库服务无法使用.  



### 本地开发环境运行
```
npm run start
```
[http://localhost:8080/](http://localhost:8080)

### 生产环境构建
```
npm run build
```


# 部分功能演示
提示：GIF分辨率较高，放大当前页面视图可获得更清晰图像
<br>
### 登陆与登出

<img src="https://github.com/Willchenwy/resource/blob/master/gif/login%26logout.gif"/>

<br>

### 注册

<img src="https://github.com/Willchenwy/resource/blob/master/gif/signup.gif"/>

<br>

### 发送新鲜事

<img src="https://github.com/Willchenwy/resource/blob/master/gif/post.gif"/>

<br>

### 新鲜事回复

<img src="https://github.com/Willchenwy/resource/blob/master/gif/reply.gif"/>

<br>

### 点赞与取消点赞

<img src="https://github.com/Willchenwy/resource/blob/master/gif/like%26likecount.gif"/>

<br>

### 发送消息

<img src="https://github.com/Willchenwy/resource/blob/master/gif/new_message.gif"/>

<br>

### 回复消息

<img src="https://github.com/Willchenwy/resource/blob/master/gif/message_reply.gif"/>

<br>

### 未读提醒

<img src="https://github.com/Willchenwy/resource/blob/master/gif/notification.gif"/>

<br>

### 用户历史新鲜事

<img src="https://github.com/Willchenwy/resource/blob/master/gif/user_profile.gif"/>

<br>

# Future Work
* 增加 Node.js 中间层用于数据预处理
* 开发 React Native 版本
* 增加其他功能
