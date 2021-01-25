---
title: （一）react的基本使用
---
## 1.React开发环境的搭建

### 安装官方脚手架create-react-app

* 这里介绍两种方式，习惯用哪个你自己选

**第一种**

	` npm install -g create-react-app `

	` create-react-app  myapp`

	**第二种**

	`npx  create-react-app  myapp`


* 上述代码的myapp是项目名，可以自定义

### 项目初始化

* 安装完成后，请执行如下命令

```
cd myapp
npm start
```

* 项目名不一定要和我的一致，切换进去，启动就好
* `npm i -g yarn`(可选命令)
* 此外，你如果全局安装了yarn，用yarn start启动也行
* 安装过程可能有点慢，稍等一会儿

:::danger
若运行时，报版本不兼容的错误，需要在根目录下面建一个.env文件，
在其内加上SKIP_PREFLIGHT_CHECK=true，可以规避此问题
:::

### 目录结构介绍

安装完成并初始化项目后，打开项目文件夹，你会看到如下内容

![avatar](/assets/img/react目录结构.png)

|  |  |
|--|--|
| README.md | 项目说明文件，先不用管它，等托管github或实际工作使用以markdown语法编写就好 |
|package.json|webpack配置和项目包管理文件，里边有些命令脚本和依赖，先不用管它|
|lock文件|package-lock.json或者yarn.lock都是锁定安装版本号的，保证你托管GitHub后大家下载安装的依赖是一致的|
|gitignore |git配置忽略文件，不需要上传的可以写里边，比如node_modules文件夹|
|node_modules |项目依赖包，如果你学过node，对这个应该很熟悉|
|public |开放出去的公共资源，如果你想读取本地json，请放这个目录下|
|src|放源码的位置，也是对我们开发者而言最核心的东西|


## 2.类组件和函数组件的编写

> 在react中，一切皆组件。传统布局头部，左侧导航，主体内容，尾部，都可以看作是一个个组件，独立维护。这像搭积木，一块块的小组件最终搞出个小房子。react组件分为两种，函数组件和类组件，两者都会用到。`相比之下，类组件更普遍，但如果组件中不涉及业务逻辑，函数组件更好用些。`下边举个例子说明什么二者区别。
***
### 简单的函数组件

* 你也许会感到意外，这就是函数组件了？没错，就是这样。

```js
function Header(){
  return <h1>我是头部</h1>;
}
```

* 如何使用呢？

```js
function App() {
  return (
    <Header/>
  );
}
```

* 这样就行了

> 仔细观察，你会发现App组件也是个函数组件。此外，组件不管是定义还是使用都是大写。确实这样，react中，区分组件和HTML标签的方式就是大小写。大写的以组件方式解析，小写的以HTML标签解析。对了，单双标签无所谓，看个人习惯。

***

### 简单的类组件
> 真正有关键字定义类是es6开始的，用class。下面用类组件改写上述App函数组件，实现相同的效果，输出hello world

```js
import React, {Component} from 'react'
class App extends Component{
    render(){
        return (
            <div>
                hello world
            </div>
        )
    }
}
export default App;
```


也许你不太理解上边的import React, {Component} from 'react'，那个大花括号，是es6的语法，解构赋值，推荐参考下阮一峰大神的[es6入门](http://es6.ruanyifeng.com/#docs/object#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)

* 代码中不会再写var，用let或const代替，详情参见[let](http://es6.ruanyifeng.com/#docs/let)
* 要是不理解，也可以拆分来写
import React from 'react'
const Component = React.Component

```js
import React from 'react';
const Component = React.Component;
class App extends Component {
  
  render() {
    return (
      <div>
        hello world
      </div>
    );
  }
}
export default App;
```