---
title: （四）横向柱状图
---

# 示例

![avatar](/assets/img/横向柱状图.png)

```js
createEcharts() {
      
      let chart = this.$refs.mychart;
      let myChart = this.$echarts.init(chart);
      // 绘制图表

      myChart.setOption({
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    grid: {
        left: '3%',
        right: '20%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        show:false
    },
    yAxis: [{
        type: 'category',
        data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
        inverse:true,//把数据翻转过来
        show:true,
        axisTick:{
            //不显示刻度线
            show:false
        },
        axisLine:{
            //不显示轴线
            show:false
        },
        axisLabel:{
            //标签的样式
            fontSize:'12',
        }
    },{
        type: 'category',
        data: ['702', '350', '610', '793', '664'],
        inverse:true,
        show:true,
        axisTick:{
            show:false
        },
        axisLine:{
            show:false
        },
        axisLabel:{
            fontSize:'12',
             margin:-100
        }
    }],
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [70, 34, 60, 78, 69],
            yAxisIndex:0,
            label:{//设置柱子上的文字
                show:true,
                position:'inside',
                formatter: '{c}%'
            },
            itemStyle:{
                // barCategoryGap:20,
                color(params){
                    let choiceColor = ['#5E89E3','#DD888E','#96CFEB','#ECBD70','#9A7EF2']
                    // 设置每个柱子的颜色
                    return choiceColor[params.dataIndex]
                },
                barBorderRadius:20
            }
        },
        {
            name: '框',
            type: 'bar',
            data: [100, 100, 100, 100, 100],
            yAxisIndex:1,
            itemStyle:{
                color:'none',
                //取消柱子的背景样色，变成镂空的
                borderColor:"#78BDE0",
                borderWidth:2,
                barBorderRadius:20,
            }
        }
    ]
});
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
```