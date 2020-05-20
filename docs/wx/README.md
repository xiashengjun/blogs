# 微信小程序

> 开发前期准备工作不描述\(申请appid,下载开发工具...\)

## 小程序基础

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


## 语法

### Mustache语法

#### WXML基本格式

* 类似于html代码
* 必须有严格的闭合\(单标签也需要闭合\)
* 大小写敏感
* div=&gt;view;span=&gt;text

[小程序官网](https://mp.weixin.qq.com/)

[入口文件配置](https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html)

[小程序打开场景](https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html)

[httpbin各类网络请求模拟](http://httpbin.org/)

