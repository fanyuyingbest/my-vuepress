# 从 0 开始配置 webpach4.0

## webpack 的演化

### 1.CommonJS--> AMD

> CommonJS 在浏览器内并不适用，因为 require() 的返回是同步的，意味着有多个依赖的话需要一个一个依次下载，阻塞了 js 脚本执行
> 所以在 CommonJS 的基础上定义了 AMD,使用异步回调语法并行下载多个依赖

```
  require(['./b','./c'],function(b,c){
    var n = b.square(2)
    console.log(c)
  })
```

> 相应的导出语言可以这样写

```
 define(['./d'],function(d){
   return d.PI
 })
```

define() 和 require() 的区别是，define()必须要在回调函数中返回一个值作为导出的内容；require()不需要导出内容，因此回调函数不需要返回值，也无法作为被依赖项被其他文件导入，因此用于入口文件，比如页面加载 a.js

```
 <script src="js/require.js" data-main="js/a"></script>
```

### 2.上手一个简单的 SPA 应用

#### 1-1 安装 node

#### 1-2 初始化一个项目

- 1.创建一个文件夹，然后在文件夹内搭建项目，先看一下目录结构

```
 |-- dist                 打包输出目录，只需要部署该文件夹到生产环境
 |-- package.json         项目配置信息
 |-- node_module          npm 安装的依赖包
 |-- src                  源代码
 |  |-- components        可复用的模块
 |  |-- index.html        入口 html
 |  |-- index.js          入口 js
 |  |-- shared            公共函数库
 |  |-- views             页面
 |-- webpack.config.js    webpack配置文件
```

- 2.初始化项目 npm init

#### 1-3.给项目装上 eslint 代码检测工具

```
 npm install eslint eslint-config-enough babel-eslint eslint-loader --save-dev
```

npm install 可以同时安装多个包，中间用空格隔开即可<br/>

--save-dev 会将安装包和版本号记录到 package.json 中的 devDependencies 对象中<br/>

--save 会记录到 dependencies 对象中<br/>

我们在提交 git 代码时，会将 node_module 在.gitignore 文件中忽略，在提交到公共库中后，其他人可以直接根据 package.json 配置文件直接执行 npm install <br/>

它会根据 devDependencies 和 dependencies 字段，把记录的包的相应版本下载下来<br/>

这里的 eslint-config-enough 是配置文件，它规定了代码规范，如果需要它生效，需要在 package.json 文件中添加内容：

```
 {
   "eslintConfig":{
     "extends":"enough",
     "env":{
       "browser":true,
       "node":true
     }
   }
 }

```

banel-eslint 是 eslint-config-enough 依赖的语法解析库，替代 eslint 默认的解析库以支持还未标准化的语言<br/>

eslint-loader 用于在 webpack 编译的时候检查代码，如果有错误，webpack 会报错<br/>

项目里安装了 eslint 还没用，我们的 IDE 和编辑器也需要安装 eslint 插件支持<br/>

#### 1-4 写几个页面

- 编辑 src/index.html 文件
  > 写简单的结构，html body head 等标签
  > 不需要写 script 标签，webpack 会自动打包加入

#### 1-5 安装 webpack 和 babel

- 将 webpack 和它的插件安装到项目中
- webpack 是 webpack 的核心库
- webpack-cli 是 webpack 命令行
- webpack-serve 是 webpack 用来开发调试的服务器，有了它就不用配置 nginx 了
- html-webpack-plugin,html-loader,css-loader,style-loader 等是打包 html，css 文件
- file-loader,url-loader 是打包二进制文件插件

```
 npm install webpack webpack-cli webpack-serve html-webpack-plugin html-loader css-loader style-loader file-loader url-loader --save-dev
```

为了让不支持 ES6 的浏览器可以正常运行，需要安装 babel，它会将 ES6 源代码转化为 ES5

```
 npm install babel-core babel-preset-env babel-loader --save-dev
```

- babel-core 是 babel 的核心编译器，babel-preset-env 是一个配置文件，可以转换 ES2017..到 ES5
- babel-preset-env 打包不生效，需要在配置文件中加入 babel 配置：

```
 {
   "babel":{
     "presets":["env"]
   }
 }
```

#### 1-6 配置 webpack

> 配置 webpack 需要创建 webpack.config.js 文件，由于该文件是在 node 中运行，所以不支持 ES6 语法

#### 1-7 运行项目

配置完成，开始运行项目：

- 测试环境 webpack-serve

```
 ./node_modules/.bin/webpack-serve webpack.config.js
```

> 不同平台的配置命令不同，windows 自行搜索
