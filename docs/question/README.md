---
title: Vue常见面试题
---
## computed有缓存，data不变则不会重新计算


## watch 如何深度监听？
 > deep:true;


## watch监听引用类型，拿不到oldVal

>（1）值类型(基本类型)：数值(number)、布尔值(boolean)、null、undefined、string(在赋值传递中会以引用类型的方式来处理)。
>（2）引用类型：对象、数组、函数。

## 如何遍历对象？

 ```<li 
    v-for="(val,key,index) in list" 
    :key="key">
    {{index}} - {{key}} - {{val.title}}
    </li>
```
## props和$emit

> this.$emit("方法名",data)

---

## 组件间通讯 -自定义事件

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
## beforeDestory当中正常做哪些操作

> 销毁自定义事件，防止造成内存泄漏

---
## 组件生命周期

> 父子组件创建和销毁的顺序
> >先创建父组件，再创建子组件
> >先渲染子组件，再渲染父组件