---
title: vue相关面试题
---
# 1.computed有缓存，data不变则不会重新计算

---
#### 2.watch 如何深度监听？
 > deep:true;

---
#### 3.watch监听引用类型，拿不到oldVal

>（1）值类型(基本类型)：数值(number)、布尔值(boolean)、null、undefined、string(在赋值传递中会以引用类型的方式来处理)。
（2）引用类型：对象、数组、函数。
