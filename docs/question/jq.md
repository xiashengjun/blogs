---
title: JQuery和JS相关面试题
---
## 1.内置对象

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

## 2.cookies，sessionStorage 和 localStorage 的区别？

>* cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密），只能存字符串
>* cookie数据始终在同源的http请求中携带（即使不需要），会在浏览器和服务器间来回传递
>* sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存

>> 存储大小：
>>* cookie数据大小不能超过4k
>>* sessionStorage(临时)和localStorage(永久)虽然也有存储大小限制，但比cookie大得多，可以达到5M或更大

>>有期时间：
>>* localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
>>* sessionStorage 数据在当前浏览器窗口关闭后自动删除
>>* cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

### 设置cookie的有效期

```markup
let now = new Date();
    now.setMinutes(now.getMinutes() + 1);
    document.cookie = "name=xia;expires=" + now.toUTCString();
```

### 删除cookie值

```markup
 let now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    document.cookie = "name=xia;expires=" + now.toUTCString();
```

### 封装cookie

```markup
//添加cookie
  function setCookie(key, val, expires) {
     if(typeof val === 'object'){
        val = JSON.stringify(val)
      }
      let now = new Date();
      now.setMinutes(now.getMinutes() + expires);
      document.cookie = `${key}=${encodeURI(val)};expires=` + now.toUTCString();
    }
//删除cookie
    function remove(key) {
      setCookie(key, null, -1)
    }
//获取cookie值
  function getCookie(key){
      let obj = {};
    document.cookie.split('; ').forEach(r=>{
      //去除分号的时候要连后面的空格也去掉split('; ')
      let arr = r.split('=');
      try{
        obj[arr[0]]=JSON.parse(decodeURI(arr[1]));
      }catch(error){
        obj[arr[0]]=decodeURI(arr[1]);
      }
    })
    if(key)return obj[key];
    return obj
    }
```

## 多行元素的文本省略号

```markup
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical
```

## 事件循环

### 异步事件包括

* 定时器

* ajax

* 绑定的onclick事件等

* promise

:::danger
new promise 会立即执行，但是then是需要异步执行的
:::
