---
title: （三）饼形图
---
# 示例
![avatar](/assets/img/饼形图.png)

```js
createEcharts() {
      let chart = this.$refs.mychart;
      let myChart = this.$echarts.init(chart);
      // 绘制图表

      myChart.setOption({
        color: ["#039BE5", "#8BC34A", "#FBC02D", "#FF7043", "#FFCCBC"],
        title: {
          text: "南丁格尔玫瑰图",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          itemWidth:10,
          itemHeight:10,
          textStyle:{
            fontSize:"12"
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: "地区分部",
            type: "pie",
            label:{
              fontSize:12//修改图形文字大小
            },
            labelLine:{//修改链接图形和文字的线条：length和length2
              length:6,
              length:8
            },
            radius: ['10%', '70%'],//修改饼形图大小
            // roseType: "area",//面积显示数据
            roseType: "radius",//半径显示数据
            center:['50%','50%'],
            data: [
              { value: 20, name: "云南" },
              { value: 26, name: "北京" },
              { value: 24, name: "山东" },
              { value: 25, name: "河北" },
              { value: 20, name: "江苏" },
              { value: 25, name: "浙江" },
              { value: 30, name: "四川" },
              { value: 42, name: "湖北" }
            ]
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
```