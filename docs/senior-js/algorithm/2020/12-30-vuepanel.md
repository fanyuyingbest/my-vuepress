# vue 撸后台

## 1.为什么要做这个项目

> 大部分时候，开始一个项目，会直接用工具开始搭建一个后台，然后一步一步补充业务代码，很多细节或者说底层就了解的不够透彻,可以借鉴和模仿他人的项目来自己走一遍整个流程，加深理解

ps:这里参考和借鉴 大佬的文章和项目 [点击查看](https://juejin.cn/post/6844903476661583880)

## 2.项目目录结构

```
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

### 2-1 api 和 views

由于项目后台模块很多，且会随着业务发展模块会越来越多，所以前期要做好业务的划分和项目结构，可以将业务前端代码放在 views 文件夹下，api 文件夹放对应的接口文件，和 views 目录下的文件一一对应

如 views 的 atricle 文件夹下主要放 article 的业务模块，对应的 api 文件夹下 article.js,后续的接口文件都可以放在该文件;业务中用到的公用接口，还是需要放到公用接口中，直接引用即可

### 2-2 components

components 主要用来放置全局公用组件，比如上传，富文本等，一些页面级的还是放到 views 下

### 2-3 store

当项目耦合度比较大时，需要使用 vuex，比如登陆的 token,用户信息，全局个人配置偏好等，需要但在 vuex 中统一管理，但是记住：不要为了用 vuex 而用 vuex

## 3.webpack 配置

> 本项目是由 vue-cli 的 webpack-template 为基础模版构建的

### 3-1 jquery(不建议)

> 很多项目需要用到第三方插件，这些插件大部分又依赖于 jq,为防止报错，需要在 webpack 的配置文件中做好配置

```
 new webpack.ProvidePlugin({
   $: 'jquery',
   'jQuery': 'jquery'
 })
```

> 注意：当 webpack 遇到 require 的第三方库中出现全局的$,jQuery 和 window.jquery 时，会出现 node_module 下的 jq 包 export 出来的东西了

### 3-2 alias

> 当项目逐渐发展，文件与文件之间的引用就变得复杂了，此时就需要使用到 alias,每个人的习惯不一样，有的喜欢将 alias 指向 src 目录下，再使用相对路径找文件

```
 resolve: {
   alias: {
     '~': resolve(__dirname,'src')
   }
 }

 //使用
 import stickTop from '~/components/stickTop'
```

> 或者使用更多的配置

```
 alias: {
   'src': path.resolve(__dirname,'../src'),
   'components': path.resolve(__dirname,'../src/components'),
   'api': path.resolve(__dirname,'../src/api'),
   'utils': path
 }

  // 使用
  import stickTop from 'components/stickTop'
  import getArticle from 'api/article'
```

## 4.ESLint

> 代码规范很重要，可以避免基本语法的错误，也保证了代码的可读性，推荐使用 eslint+vscode 写 vue

- 第一步，安装 eslint 插件并启动
- 第二步，扩展设置，文件-首选项-设置，打开设置文件配置

[vscode 插件和配置推荐](https://github.com/varHarrie/varharrie.github.io/issues/10)

[eslint 规则地址](https://github.com/PanJiaChen/vue-element-admin/blob/master/.eslintrc.js)
