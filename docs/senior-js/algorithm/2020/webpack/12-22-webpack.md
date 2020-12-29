# 从 0 开始配置 webpach4.0

## 1.webpack 的演化

## 2.CommonJS--> AMD

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

## 3.上手一个简单的 SPA 应用

### 3-1 安装 node

### 3-2 初始化一个项目

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

### 3-3.给项目装上 eslint 代码检测工具

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

### 3-4 写几个页面

- 编辑 src/index.html 文件
  > 写简单的结构，html body head 等标签
  > 不需要写 script 标签，webpack 会自动打包加入

### 3-5 安装 webpack 和 babel

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

### 3-6 配置 webpack

> 配置 webpack 需要创建 webpack.config.js 文件，由于该文件是在 node 中运行，所以不支持 ES6 语法

### 3-7 运行项目

配置完成，开始运行项目：

- 测试环境 webpack-serve

```
 ./node_modules/.bin/webpack-serve webpack.config.js
```

> 不同平台的配置命令不同，windows 自行搜索

- 生产环境 webpack-serve

```
 ./node_modules/.bin/webpack-cli
```

> 会生成对应 dist 文件夹

> 执行长命令比较麻烦，可以在 package.json 中的 javascript 中配置对应的命令

## 4.进阶配置

### 4-1 设置静态资源的 url 路径前缀

- 1.给资源文件加一个前缀，先修改 webpack 的配置

```
 {
   output:{
     publicPath:'/assets/'
   }
 }
```

- 2.修改 webpack-serve

```
 if(dev){
   module.exports.serve = {
     port:8080,
     host:'0.0.0.0',
     dev:{
       publicPath:'/assets/'
     },
     add: app => {
       app.use(convert(history({
         index:'/assets/'
       })))
     }
   }
 }
```

### 4-2 各个页面分开打包

- webpack 可以使用异步加载文件方式引用模版，可以使用 async/await 和 dynamic import 来实现

- 加载 path 路径页面，使用 async/await 语法，动态加载页面，创建页面实例，调用方法加载到页面

- regenerator-runtime 是 regenerator 的运行库，babel 通过插件 transform-regenerator 使用 regenerator 将 generator 函数和 async/await 语法转化为 ES5，需要运行库才能正确执行

- 因为 import() 没有正式进入标准，需要使用 syntax-dynamic-import 来解析语法，我们安装 babel-preset-stage-2

```
 npm install regenerator-runtime babel-preset-stage-2 --save-dev
```

- package.json 也需要做修改：

```
 {
   "babel":{
     "presets":[
       "env",
       "stage-2"
     ]
   }
 }

```

- 然后修改 webpack 的配置：

```
 {
   // 代码中的资源文件会合并为一个包，我们称这个包为chunk,每个chunk里面又很多的modules,chunkFilename用来配置这个chunk 输出文件名
   // [chunkhash]是这个chunk的hash值，文件会时刻发生变化
   // 还有一个占位符，编译时每个chunk会有一个id
   output:{
     chunkFilename:'[chunkhash].js'
   }
 }
```

### 4-3 第三方库和业务代码分开打包

> 分开打包，在更新业务代码时，可以借助浏览器缓存，不需要再去下载第三方库。webpack4 的最大改进就是引用 chunk 自动拆分，满足以下条件，chunk 就会被拆分

- 新的 chunk 能被复用，或者模块来自 node_modules 目录
- 新的 chunk 大于 30k(min+gz 压缩前)
- 按需加载 chunk 的并发请求数量小于等于 5 个
- 页面初始化加载时的并发请求数量小于等于 3 个

> 分开打包注意以下几个参数即可

```
 plugins:[
   new webpack.HashedModuleIdsPlugin()
 ],
 optimization: {
   // chunk文件名发生改变时，会导致引用这个chunk文件也发生变化
   // runtimeChunk设置为true时，webpack会将chunk文件名全部存到一个单独的chunk中
   // 这样更新一个文件只会影响它所在的chunk和runtimeChunk,避免引用这个chunk的文件也发生改变

   runtimeChunk:true,
   splitChunks: {
     // 默认entry的chunk不会被拆分
     // 使用了html-wenpack-plugin 动态插入<script>标签，entry被拆成多个chunk也能自动被插入到html中
     // 将chunks配置为all,就把entry chunk也拆分了

     chunks:'all'
   }
 }
```

### 4-4 输出在 entry 文件的 hash

> chunkFilename 使用[chunkhash]防止浏览器读取错误缓存，那么 entry 同样需要加上 hash,使用 webpack-serve 启动开发环境时，entry 是没有[chunkhash]的，用了会报错，所以只有在 wenpack-cli 时使用[chunkhash]

```
 output: {
   filename:dev ? '[name].js' : '[chunkhash].js'
 }
```

> 每个 entry 可以定义由多个 module 组成，这些 module 可以依次执行

```
 {
   entry: {
     main: './src/index.js',
     wendor: ['jquery','loadsh']
   }
 }
```

> entry 引用规则和 import 一致，会寻找 node_module 包，然后结合 CommonsChunkPlugin 把 vendor 定义的 module 从业务代码中分离打包出一个单独的 chunk

```
 {
   entry: {
     main: ['./src/index.js']
   }
 }

```

> webpack 会给这个 entry 指定名字为 main,[name]就是 entry 的名字；[hash]占位符，这个是整个编译过程的总 hash 值，但不是单文件的 hash 值，项目中任何一个文件的变动，都会改变这个 hash 值，此处的[hash]占位符是始终存在的，我们 不希望修改一个文件就改变所有的输出文件，这个不利于浏览器的缓存，所以这个 hash 意义不大

### 4-5 开发环境关闭 performance.hints

> 测试环境会报 warning,建议每个输出的 js 文件大小不要超过 250k，但开发环境包含了 sourcemap 并且代码压缩一般都会超过这个大小，所以需要将这个 waining 关闭，webpack 配置加入：

```
 {
   performance: {
     hints:dev ? false : 'warning'
   }
 }
```

### 4-6 配置 favicon.png

> 在 src 目录中放一张 favicon.png,然后在 src/index.html 的 head 中插入

```
 <link rel="icon" type="image/png" href="favicon.png">
```

> 修改 webpack 配置

```
 mudule: {
   rules: [
     test
   ]
 }
```

### 4-7 开发环境允许其他电脑访问

> internal-ip

### 4-8 打包时自定义部分参数

> 例如：在 webpack-serve 写死监听接口，会导致端口冲突，一般会去 webpack.config.js 去暴力修改配置

> 这种情况一般只影响测试换，生产环境配置不同，生产环境可能需要配置一个 CDN 地址

- default.js 生产环境

```
 module.exports = {
   publicPath: 'http://cdn.example.com/assets/'
 }
```

- dev.js 默认开发环境

```
 mudule.exports = {
  publicPath:'/assets/',
  serve: {
    port: 8089
  }
 }

```

- local.js 个人本地开发环境修改部分参数

```
 const config  = require('./dev')
 config.serve.port = 8087
 mudule.exports = config
```

- webpack 修改配置
  > 这里关键是 npm run 传进来的自定义参数可以通过 process.env.npm*config*\*获得，参数中的-会被转成\_
  > 还有一点，不要把个人的配置文件提交到 git,所以在配置文件中忽略

### 4-9 webpack-serve 处理带后缀名的文件的特殊规则
