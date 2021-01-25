---
title: css相关面试题
---

## 文本超出就隐藏并且显示省略号

### 只有一行内容时

```css
overflow:hidden; //超出的文本隐藏

text-overflow:ellipsis; //溢出用省略号显示

white-space:nowrap; //溢出不换行
```

### 当有两行的内容时

```css
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box; //作为弹性伸缩盒子模型显示。
-webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
-webkit-line-clamp:2; //显示的行
```