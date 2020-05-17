---
title: （二）折线图
---
# 示例
![avatar](/assets/img/折线图.png)

```markup
createEcharts() {
      let chart = this.$refs.mychart;
      let myChart = this.$echarts.init(chart);
      // 绘制图表
      myChart.setOption({
        color: ["#F92672", "#72B1BE"],
        title: {
          text: "人员变化",
          left: "center",
          textStyle: {
            color: "#4488EF"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "30"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          //可下载
          left: "30",
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ],
          axisLine: {
            lineStyle: {
              color: "#D73D34"
            }
          },
          axisTick: {
            inside: true //刻度朝里
          },
          axisLabel: {
            //设置刻度标签样式
            textStyle: {
              color: "#4488EF"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            //设置刻度标签样式
            textStyle: {
              color: "#4488EF"
            }
          }
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            smooth: true,
            data: [
              120,
              132,
              101,
              134,
              90,
              230,
              210,
              132,
              101,
              134,
              90,
              230,
              210
            ],
            areaStyle: {}
          },
          {
            name: "联盟广告",
            type: "line",
            smooth: true, //让直线变得圆滑
            areaStyle: {
              color:"#589FF8",
              shadowBlur: 10
            },
            data: [
              220,
              182,
              191,
              234,
              290,
              330,
              100,
              182,
              191,
              234,
              290,
              330,
              310
            ]
          }
        ]
      });
    }
```