---
title: （二）Vue的高级特性
---

# Vue的进阶

## 自定义v-model

```markup
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

## $nextTick

> nextTick()，是将回调函数延迟在下一次dom更新数据后调用，简单的理解是：当数据更新了，在dom中渲染后，自动执行该函数

> 什么时候用$nextTick
> > 1、Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。
> > 2、当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它


> Vue.nextTick(callback) 使用原理：
> > 原因是，Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新

## slot
> 基本使用
```markup
<div><slot name="header">
slot的默认内容
 </slot>
 </div>`
 `<Home>
 <div>该标签代替slot</div>
 </Home>
 ```

> 作用域插槽
```markup
<Home>
 <template  v-slot="getdata(随便取)">
 <div>
 {{getdata.propsdata}}
 </div>
 </template>
 </Home>
 ```

> 具名插槽
 ```markup
 <Home>
 <template v-slot:header  v-slot="getdata(随便取)">
 <div>
 {{getdata.propsdata}}
 </div>
 </template>
 </Home>
 ```

 ## 动态、异步组件
> 动态组件
> > `<component :is="组件名" />`
> 
> 异步组件
> > 一般引用组件:
> > > import Home from '@/components/Home'
> >
> > 异步组件：用到组件时，组件才显示
> > > const Home = () => import('@/components/Home')

## keep-alive
> 作用：
> > 1.缓存组件
> > 2.组件频繁切换，不需要重复渲染，不会重复创建和销毁
> 
```markup
<keep-alive>
 <Home />
</keep-alive>
```

## mixin
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