---
title: （一）echarts的基本配置
---
![avatar](/assets/img/配置.png)
# echarts的基本配置

## 1.tooltip
> 提示框组件
> >trigger触发方式

## 2.legend
> 图例组件
> `legend:{
          type:'plain',
          data:['销量1','销量2']
        }
        `
> 当series中有name值的时候，legend没有data值也会显示图例组件

## 3.toolbox
> 工具箱组件
> >可以实现另存为图片等功能
> >feature:{
> >   saveAsImage:{}
> > }

## 4.grid
> 网格配置
> 修改图表大小
> 
` grid:{
          left:'0%',
          top:"20px",
          right:"0%",
          bottom:"4%",
          containLabel:true
        }`

## 5.xAxis
> `splitLine: {
            lineStyle: {
              color: "#317198"
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#317198"
            }`
> > x轴标轴和x轴折线的样式

> ` axisLabel: {
            color: "#5FD3F9",
            padding: 5,
            fontSize: 16,
            padding:10,
            backgroundColor:{
              image:require('../../assets/img/smallbox/下载.png')
            }
          }`

## 6.title
> `title:{
          text:'我的Echarts',
          left:'middle'
        }`

## 7.让图表跟随屏幕自适应
```markup
 window.addEventListener("resize",function(){
        mychart.resize();
      })
```