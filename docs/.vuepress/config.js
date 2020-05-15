const moment = require('moment');
const secert = require('./config/secert');
module.exports = {
  title: "七分熟",
  description: "七分熟的第一个博客",
  themeConfig: {
    lastUpdated: '最后更新时间',
    nav: [{
        text: '主页',
        link: '/'
      },
      {
        text: 'Vue',
        link: '/vue/'
      },
      {
        text: '面试题',
        link: '/question/'
      },
      {
        text: '更多',
        link: '/',
        items: [
          {
            text: 'echarts',
            link: '/echarts/'
          },
          {
            text: 'Node',
            link: '/node/'
          },
        ]
      },
      {
        text: '留言',
        link: '/words/'
      }
    ],
    logo: '/assets/img/logo.png',
  },
  plugins: {
    '@vuepress/last-updated': {
      transformer: (timestamp) => {
        // 不要忘了安装 moment
        // const moment = require('moment')
        moment.locale("zh-cn")
        return moment(timestamp).format("LL")
      }
    },
    '@vssue/vuepress-plugin-vssue': {
      // 设置 `platform` 而不是 `api`
      platform: 'github-v4',

      // 其他的 Vssue 配置
      owner: 'xiashengjun',
      repo: 'blogs',
      clientId: secert.clientId,
      clientSecret: secert.clientSecret,
      autoCreateIssue:true
    },
    '@vuepress/back-to-top':true,
    'vuepress-plugin-auto-sidebar': {}
  }
}