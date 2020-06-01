# 微信小程序基础

> 开发前期准备工作不描述\(申请appid,下载开发工具...\)

## 小程序结构

### 小程序开发主要部分

* 页面布局: wxml =&gt; 类似html
* 页面样式: wxss =&gt; 类似css\(部分支持,部分增强\)
* 页面脚本: js+wxss
* 目录结构
   ```markup
    project
    ├── pages
    |   ├── index
    |   |   ├── index.json  index 页面配置
    |   |   ├── index.js    index 页面逻辑
    |   |   ├── index.wxml  index 页面结构
    |   |   └── index.wxss  index 页面样式表
    |   └── log
    |       ├── log.json    log 页面配置
    |       ├── log.wxml    log 页面逻辑
    |       ├── log.js      log 页面结构
    |       └── log.wxss    log 页面样式表
    ├── app.js              小程序逻辑
    ├── app.json            小程序公共设置
    └── app.wxss            小程序公共样式表
    ```

### 文件结构

![](/assets/img/wx-1.png)



### 小程序常见配置文件

* project.config.json: 项目配置文件,如项目名称,appid
* sitemap.json: 站点地图
* app.json: 全局配置
* page.json: 页面配置

### 小程序的双线程模型

* 谁是小程序的宿主环境? =&gt; 微信客户端
* 宿主环境为了执行小程序的各种文件:wxml,wxss.js文件,提供了小程序的双线程模型
* 渲染层 =&gt; 执行wxml,wxss\(一个程序有多个页面,会使用多个Webview线程\) \| 逻辑层 =&gt; 执行js  \| native\(微信客户端\)

![](/assets/img/wx-2.png)

* 界面渲染整体流程
  * 在渲染层,宿主环境把WXML转化为对应的JS对象
  * 将JS对象再次转换为真实DOM树,交由渲染层线程渲染
  * 数据变化时,逻辑层提供最新的变化数据,JS对象发生变化比较进行diff算法对比
  * 将最新变化的内容反映到真实的DOM树，更新UI

### 小程序启动流程

![](/assets/img/wx-3.png)

### 快捷键

```text
// 代码格式化
alt+shift+f
// 真机调试(会自动同步)
ctrl+shift+p
```

### 注册App常规使用

* 判断小程序的进入场景
* 监听生命周期函数,在生命周期中执行对应的业务逻辑,比如在某个生命周期函数中获取微信用户的信息
* 因为App\(\)实例只能有一个,并且时全局共享的\(单例对象\),所以可以放入共享数据

### Page生命周期

![](/assets/img/wx-4.png)


### Mustache语法

#### WXML基本格式

* 类似于html代码
* 必须有严格的闭合\(单标签也需要闭合\)
* 大小写敏感
* div=&gt;view;span=&gt;text

## app.json文件的配置

### 导航栏相关设置

```markup
"window":{
  "backgroundTextStyle":"light",         //下拉loading的样式，仅支持dark和light
  "navigationBarBackgroundColor":"#000", //导航栏背景颜色，16进制
  "navigationBarTitleText":"首页",        //导航栏标题文字内容
  "navigationBarTextStyle":"white"       //导航栏标题颜色，仅支持black和white
}
```

### tabbar的样式设置

```markup
"tabBar":{
  "color":"#999",             //tabBar上的文字颜色，16进制
  "selectedColor":"#FF7792",  //tabBar上选中文字颜色，16进制
  "list":[                    //tabBar的list里为数组，里面的对象至少为2项
          {
            "pagePath": "pages/index/index",
            "text": "首页",
            "iconPath": "./icons/home.png",
            "selectedIconPath": "./icons/home-o.png"
        }, {
            "pagePath": "pages/category/index",
            "text": "分类",
            "iconPath": "./icons/category.png",
            "selectedIconPath": "./icons/category-o.png"
        }, {
            "pagePath": "pages/cart/index",
            "text": "购物车",
            "iconPath": "./icons/cart.png",
            "selectedIconPath": "./icons/cart-o.png"
        }, {
            "pagePath": "pages/user/index",
            "text": "我的",
            "iconPath": "./icons/my.png",
            "selectedIconPath": "./icons/my-o.png"
        }
  ]
}
```

## 基本视图容器

### swiper、swiper-item

| 属性名 | 类型 | 默认值 | 说明 |
| ---   | ---  | ---  | ---  |
| indicator-dots | Boolean | false | 是否显示面板指示点 |
| indicator-color | Color | rgba | 指示点的颜色 |
| indicator-active-color | Color | #000 | 当前选中的指示点颜色 |
| autoplay | Boolean | false | 是否自动切换 |
| interval | Number | 5000 | 自动切换的时间 |
| duration | Number | 5000 | 滑动动画时长 |
| circular | Boolean | false | 是否采用衔接滑动 |

### 文本text

* 1.selectable:”{{true}};长按可以复制文本；
* 2.space决定空格的大小：string三个值ensp，emsp，nbsp半个中文字符，一个字符大小
* 3.decode是否解析文本

### 可滚动视图区域scroll-view

* 1.Scroll-y:允许纵向滚动；//纵向时要给高Scroll -x:允许横向滚动；
* 2.Scroll-top:可以设置竖向滚动条的位置；
* 3.bindscrolltoupper:当滚动到顶部时回调；bindscrolltolower:当滚动到底部时回调；bindscroll:滚动时触发；

```markup
scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
```

:::tip
scroll-into-view=“item的id”
加了之后直接跳转到此view
:::

## 路由跳转

* 1.wx.switchTab: 跳转到tabBar页面，并关闭所有非tabBar页面

* 2.wx.reLaunch: 关闭所有页面，跳转到任意页面

* 3.wx.redirectTo: 关闭当前页面，跳转到非tabBar页面

* 4.wx.navigateTo: 保留当前页面，跳转到非tabBar页面，使用wx.navigatoBack可以返回原页面

[小程序官网](https://mp.weixin.qq.com/)

[入口文件配置](https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html)

[小程序打开场景](https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html)

[httpbin各类网络请求模拟](http://httpbin.org/)

