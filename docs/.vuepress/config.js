// const moment = require('moment');
// moment.locale('zh-cn')
module.exports = {
  title:"七分熟",
  description:"七分熟的第一个博客",
  themeConfig: {
    lastUpdated: '最后更新时间',
    sidebar:'auto',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'Node', link: '/node/',
      items: [
        { text: 'echarts', link: '/echarts/' },
        { text: 'Japanese', link: '/language/japanese/' }
      ] },
      { text: '留言', link: '/words/' }
    ],
    logo: '/assets/img/logo.png',
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp,lang) => {
          // 不要忘了安装 moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).fromNow("LLLL")
        }
      }
    ]
  ]
}