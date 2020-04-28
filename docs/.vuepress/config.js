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
      nav:require('./nav'),
      sidebar: require('./sidebar'),
    },
}