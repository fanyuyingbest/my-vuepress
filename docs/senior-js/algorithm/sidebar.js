module.exports = [
  {
      title: '知识体系梳理',
      collapsable: true,
      path: '/senior-js/algorithm/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      sidebarDepth: 1,    // 可选的, 默认值是 1
  },
 {
      title: '2020年',
      collapsable: true,
      path: '/senior-js/algorithm/2020/',
      sidebarDepth: 1,    // 可选的, 默认值是 1
      children: [
          '/senior-js/algorithm/2020/other/05-07-markdown',
          '/senior-js/algorithm/2020/webpack/12-22-webpack',
      ]
  },
  {
    title: '数据结构-拉钩教育',
    collapsable: true,
    path: '/senior-js/algorithm/data-structure/',
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        '/senior-js/algorithm/data-structure/data-1',
        '/senior-js/algorithm/data-structure/data-2',
        '/senior-js/algorithm/data-structure/data-3',
        '/senior-js/algorithm/data-structure/data-4',
        '/senior-js/algorithm/data-structure/data-5',
        '/senior-js/algorithm/data-structure/data-6',
        '/senior-js/algorithm/data-structure/data-7',
        '/senior-js/algorithm/data-structure/data-8',
        '/senior-js/algorithm/data-structure/data-9',
        '/senior-js/algorithm/data-structure/data-10',
        '/senior-js/algorithm/data-structure/data-11',
        '/senior-js/algorithm/data-structure/data-12',
        '/senior-js/algorithm/data-structure/data-13',
        '/senior-js/algorithm/data-structure/data-14',
    ]
 },
 {
    title: '数据结构-go',
    collapsable: true,
    path: '/senior-js/algorithm/go/',
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        '/senior-js/algorithm/go/data-1',
    ]
 },
 {
    title: '每日一题',
    collapsable: true,
    path: '/senior-js/algorithm/training/',
    sidebarDepth: 1,    // 可选的, 默认值是 1
    children: [
        '/senior-js/algorithm/training/q-1',
    ]
 },
]