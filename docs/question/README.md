---
title: Vue相关面试题
---
## 1.v-for为何使用key

* diff算法中通过tag和key来判断，是否是sameNode;
* 减少渲染次数，提升渲染性能

## 2.watch 如何深度监听？

 > deep:true;


## 3.watch监听引用类型，拿不到oldVal

>（1）值类型(基本类型)：数值(number)、布尔值(boolean)、null、undefined、string(在赋值传递中会以引用类型的方式来处理)。
>（2）引用类型：对象、数组、函数。

## 4.如何遍历对象？

 ```<li 
    v-for="(val,key,index) in list" 
    :key="key">
    {{index}} - {{key}} - {{val.title}}
    </li>
```

## 5.props和$emit

> this.$emit("方法名",data)

---

## 6.组件间通讯 -自定义事件

> import Vue from 'vue'
> new Vue() //只有Vue实例当中有$on

> mounted(){
    //绑定自定义事件
    event.$on("事件名称",this.方法名)
    }
    
 >  //调用自定义事件
    event.$emit("自定义事件名称",data);
    
 > beforeDestory(){
    //及时销毁自定义事件，否则可能造成内存泄漏
    event.$off('自定义事件名')

---
## 7.beforeDestory当中正常做哪些操作

> 销毁自定义事件，防止造成内存泄漏

---
## 8.组件生命周期

> 父子组件创建和销毁的顺序
> >先创建父组件，再创建子组件
> >先渲染子组件，再渲染父组件
:::tip
Vue实例有一个完整的生命周期，是从开始创建、初始化数据、编译模板、挂载Dom 渲染 更新 渲染 卸载等一系列过程，我们称是Vue的生命周期。

生命周期|描述
---|:--:|---
beforeCreate|组件实例被创建之初，组件的属性生效之前
created|组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用
beforeMount|在挂载开始之前被调用：相关的 render 函数首次被调用
mounted|el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
beforeUpdate|组件数据更新之前调用，发生在虚拟 DOM 打补丁之前
update|组件数据更新之后 
beforeDestory|组件销毁前调用 
destoryed|组件销毁后调用
activited|keep-alive 专属，组件被激活时调用
deactivated|keep-alive 专属，组件被销毁时调用
:::

## 9.v-show与v-if的区别

v-show 不管条件是什么，内容总是会被渲染，只是简单基于CSS的”display“属性的进行切换。
v-if  是真正的条件渲染，在组件的创建建和销毁之间切换。
如果不需要频繁切换条件用v-if，需要频繁切换条件的场景使用v-show。

## 10.Vue的响应式

### 核心API - Object.defineProperty

```js
//重新定义属性，需要监听起来
function defineReactive(target,key,value){
   //深度监听
   observer(value)

   //核心API
   Object.defineProperty(target,key,{
      get(){
         return value
      },
      set(newValue){
         if(newValue != value){
            //设置新值
            //注意：value 一直在闭包中
            value = newValue

            //触发更新视图
            updateView()
         }
      }
   })
}
```

### Object.defineProperty的一些缺点（Vue3.0启用Proxy）

* 深度监听，需要递归到底，一次性计算量大。
* 无法监听新增属性/删除属性（Vue.Set Vue.delete—）。
* 无法原生监听数组，需要特殊处理。（Object.create(Array.prototype)）

## 11.简述vdom和diff算法

* 用JS模拟DOM结构，计算出最小的变更，操作DOM

### diff算法将vdom的时间复杂度从O(n^3)优化到O(n)

* 只比较同一层级，不跨级比较
* tag不相同，则直接删掉重建，不再深度比较
* tag和key，两者都相同，则认为是相同节点，不再深度比较
