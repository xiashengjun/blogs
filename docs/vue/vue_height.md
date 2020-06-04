---
title: （二）Vue的高级特性
---

# Vue的进阶

## 1.自定义v-model

```js
<input
      style="border:2px solid red"
      type="text"
      :value="text"
      @input="$emit('change',$event.target.value)"
    />
    model: {
    prop: "text",
    event: "change"
  },
  props: {
    text: String
  }
  ```

## 2.$nextTick

> nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数

> 什么时候用$nextTick
> > 1、Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。
> > 2、当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它


> Vue.nextTick(callback) 使用原理：
> > 原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新

## 3.slot
> 基本使用
```js
<div><slot name="header">
slot的默认内容
 </slot>
 </div>`
 `<Home>
 <div>该标签代替slot</div>
 </Home>
 ```

> 作用域插槽
```js
<Home>
 <template  v-slot="getdata(随便取)">
 <div>
 {{getdata.propsdata}}
 </div>
 </template>
 </Home>
 ```

> 具名插槽
 ```js
 <Home>
 <template v-slot:header  v-slot="getdata(随便取)">
 <div>
 {{getdata.propsdata}}
 </div>
 </template>
 </Home>
 ```

 ## 4.动态、异步组件
> 动态组件
> > `<component :is="组件名" />`
> 
> 异步组件
> > 一般引用组件:
> > > import Home from '@/components/Home'
> >
> > 异步组件：用到组件时，组件才显示
> > > const Home = () => import('@/components/Home')

## 5.keep-alive
> 作用：
> > 1.缓存组件
> > 2.组件频繁切换，不需要重复渲染，不会重复创建和销毁
> 
```js
<keep-alive>
 <Home />
</keep-alive>
```

## 6.mixin
> 多个组件有相同的逻辑，抽离出来
> 多个mixin可能会造成命名冲突
> mixin和组件可能会出现多对多的关系，复杂度较高

> `export const mixin = {
  data() {
    return {
      msg: "mixin"
    }
  },
  created() {
    console.log("mixin的mounted");
  }
}`

> `import {mixin} from '@/mixin/mixin'
`
>`  mixins:[mixin]
`


## 7.vuex

> vuex是vue配套的公共数据管理工具,可以把一些共享的数据,保存到vuex中,方便整个程序中的任何组件直接获取或修改我们的公共数据

* npm安装

```text
$ npm install vuex --save
```

* main.js

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

* 创建vuex实例,得到数据仓储对象,并挂载到vm实例上

```javascript
var store = new Vuex.Store({
    state: {
        //专门用于存储数据
        count: 0
    },
    mutations: {
        //如果要操作store中的state值,只能通过调用mutation提供的方法,才能操作对应的数据,
        //不推荐直接操作state中的数据,避免数据紊乱,不能快速定位到错误原因
        increment(state,num) {
            state.count++
        }
    },
    getters: {
        //注意:getters,只负责对外提供数据,不负责修改数据,如果需要修改使用mutations
        //$store.getters.mutations
        mutations: function(state) {
            //如果引用的state内部数据发生改变,就会触发
            return state.count
        }
    }
    //如果子组件想要调用mutations中的方法,只能使用this.$store.commit('方法名')
})

//1. state中的数据,不能直接修改,如果想修改,必须通过mutations
//2. 如果组件想要直接从state中获取数据,需要this.$store.state.***
//3. 如果组件,想要修改数据,必须使用mutations提供的方法,需要通过this.$store.commit('方法名称','可选参数')
//4. 如果store中state上的数据,在对外提供的时候,需要做一层包装,推荐使用getters,如果需要使用getters,使用this.$store.getters.***

var vm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store //将vuex创建的store挂载到vm实例上
})
```

* 获取vuex上的数据\(不推荐\)

```js
<h1>
    <!-- 不推荐直接获取 -->    
    {{$store.state.count}}
</h1>

<script>
    export default() {
        methods: {
            countChanged() {
                //调用vuex中increment方法
                this.$store.commit('increment',1)
            }
        }    
    }
</script>
```

## 8.hash路由和H5 history路由

![avatar](/assets/img/hash.png)

### hash的特点 

* hash变化会戳发页面跳转，即浏览器的前进、后退。
* hash永远不会刷新页面，SPA必需的特点。
* hash永远不会提交到serve端（前端自生自灭）。
* hash是通过window.onhashchange()进行监听的

### H5 history的特点

* 用url规范的路由，但跳转时不刷新页面
* history.pushState
* window.onpopstate
* 需要后端支持

```js
//监听浏览器前进、后退
window.onpostate = (event) =>{
  console.log('onpopstate',event.state,location.pathname)
}
、、、
