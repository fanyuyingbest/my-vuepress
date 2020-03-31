module.exports = {
    title: '一只无聊的柠檬',
    description: '',
    head: [
        ['link', {
            rel: 'icon',
            href: `/logo.jpg`
        }]
    ],
    base: '/', // 这是部署到github相关的配置
    dest: './docs/.vuepress/dist',
    serviceWorker: true, // 是否开启 PWA
    markdown: {
      lineNumbers: false // 代码块显示行号
    },
    ga: '',
    evergreen: true,
    themeConfig: {
        nav: [
          {text: '前端基础', link: '/guide/' },
          {text: '算法题库', link: '/algorithm/'},
          {text: '微博', link: 'https://baidu.com'} 
        ],
        sidebar: [
          {
            title: '开发指南',
            collapsable: false, //是否展开
          },
              ['./guide/install/install','安装'],
             ['./guide/started/started','快速上手'],
          {
            title: '组件',
            collapsable: false
          },
          ['./guide/icon/icon','icon'],
          ]
        },
        //sidebarDepth: 0,
    },
    //sidebar: 'auto', // 侧边栏配置
    //sidebarDepth: 2, // 侧边栏显示2级
    // configureWebpack: {
    //   resolve: {
    //     alias: {
    //       '@alias': 'path/to/some/dir'
    //     }
    //   }
    // }
}