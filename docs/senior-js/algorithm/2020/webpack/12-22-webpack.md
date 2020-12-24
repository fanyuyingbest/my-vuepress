# 从0开始配置webpach4.0
## webpack的演化

### 1.CommonJS--> AMD

> CommonJS在浏览器内并不适用，因为require() 的返回是同步的，意味着有多个依赖的话需要一个一个依次下载，阻塞了js脚本执行
> 所以在CommonJS的基础上定义了AMD,使用异步回调语法并行下载多个依赖

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
define() 和 require() 的区别是，define()必须要在回调函数中返回一个值作为导出的内容；require()不需要导出内容，因此回调函数不需要返回值，也无法作为被依赖项被其他文件导入，因此用于入口文件，比如页面加载a.js

```
 <script src="js/require.js" data-main="js/a"></script>
```

### 2.上手一个简单的SPA应用
#### 1-1 安装node
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

#### 1-3.给项目装上eslint 代码检测工具

  ```
   npm install eslint eslint-config-enough babel-eslint eslint-loader --save-dev
  ```

  npm install 可以同时安装多个包，中间用空格隔开即可<br/>

  --save-dev 会将安装包和版本号记录到package.json中的devDependencies对象中<br/>

  --save 会记录到dependencies对象中<br/>

  我们在提交git代码时，会将node_module 在.gitignore文件中忽略，在提交到公共库中后，其他人可以直接根据package.json配置文件直接执行 npm install <br/>

  它会根据devDependencies 和 dependencies字段，把记录的包的相应版本下载下来<br/>

  这里的 eslint-config-enough 是配置文件，它规定了代码规范，如果需要它生效，需要在package.json文件中添加内容：

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

  banel-eslint 是 eslint-config-enough 依赖的语法解析库，替代eslint 默认的解析库以支持还未标准化的语言<br/>

  eslint-loader 用于在webpack 编译的时候检查代码，如果有错误，webpack会报错<br/>

  项目里安装了eslint 还没用，我们的IDE 和编辑器也需要安装eslint插件支持<br/>

#### 1-4写几个页面

  - 编辑 src/index.html 文件
   > 写简单的结构，html body head等标签
   > 不需要写script标签，webpack会自动打包加入

#### 1-5 安装webpack和babel
   - 将webpack和它的插件安装到项目中
   - webpack是webpack的核心库
   - webpack-cli 是webpack命令行
   - webpack-serve 是webpack 用来开发调试的服务器，有了它就不用配置nginx了
   - html-webpack-plugin,html-loader,css-loader,style-loader 等是打包html，css文件
   - file-loader,url-loader是打包二进制文件插件
   
   ```
    npm install webpack webpack-cli webpack-serve html-webpack-plugin html-loader css-loader style-loader file-loader url-loader --save-dev
   ```

   为了让不支持ES6的浏览器可以正常运行，需要安装babel，它会将ES6源代码转化为ES5

   ```
    npm install babel-core babel-preset-env babel-loader --save-dev
   ```

   - babel-core 是babel的核心编译器，babel-preset-env是一个配置文件，可以转换ES2017..到ES5
   - babel-preset-env 打包不生效，需要在配置文件中加入babel配置：

   ```
    {
      "babel":{
        "presets":["env"]
      }
    }
   ```

#### 1-6 配置webpack
> 配置webpack 需要创建webpack.config.js文件，由于该文件是在node中运行，所以不支持ES6语法

#### 1-7 走一个，运行项目





