---
title: JQuery和JS相关面试题
---
## 内置对象

### 数组
  :::tip
  length,push,pop,unshift,shift,sort,join,concat,reverse,slice,<br/>
  splice,indexOf,includes,some,every,forEach,map,reduce,filter
  :::

### Math
  :::tip
  ceil,floor,round,<br/>
  random(Math.round(Math.random()*(max-min))+min)<br/>
  abs,max,min,pow
  :::

#### 自定义扩展属性
  ```markup
  extend(obj, target) {
      target = target || this;
      Object.keys(obj).forEach(key => {
        target[key] = obj[key]
      })
    }
  ```
### 时间
  :::tip
  getFullYear,getMonth,getDate,getSeconds,<br/>
  getMinutes,getDay,getTime,setDate
  :::
