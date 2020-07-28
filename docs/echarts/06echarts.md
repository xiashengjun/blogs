---
title: （六）竖向柱状图
---

# 示例

![avatar](/assets/img/柱状图.png)


```vue
//封装echarts
<template>
  <div>
    <div class="thend" ref="barChart"></div>
  </div>
</template>

<script>
export default {
  props:{
    xAxisDataRank: {
      type:Array
    },
    rankData:{
      type:Array,
      default:[]
    },
    myData:{
      type:Array
    }
  },
  data(){
    return {
      chart: null
    }
  },
  mounted(){
    this.initEchart();
    window.addEventListener('resize',()=>{
      this.debounce(this.chart.resize(),100);
    })
  },
  methods: {
    initEchart() {
      const that = this;
      this.chart = this.$echarts.init(this.$refs.barChart);
      if(!this.chart){
        return;
      }
      const option = {
        //提示框
        tooltip: {
          backgroundColor:"#FFFFFF",
          position:function(point,params,dom,rect,size){
            //固定在顶部
            return 'top'
          },
          textStyle: {
            color: "#303133"
          },
          padding:[20],
          extraCssText:"box-shadow:0 2px 12px 0 ragba(0,0,0,0.06);border:0 solid #E4E7ED;z-index:20;",//echarts的层级非常高，在此处可以修改
          formatter(params,index) {
            //自定义提示框的样式
            let str = index.split("");
            let i = str[str.length - 1];
            let color;
            if(params.name === "本营业区") {
              //当x轴上的值是"本营业区"的时候，该柱子会高亮
              color = "#F7D381";
            }else{
              color = "#969AD6";
            }
            return `
            <table>
            <thead>
            <tr>
              <th style="padding: 5px;"></th>
              <th style="padding: 5px 10px;text-align:right;font-weight: 600;font-size: 12px;">${params.name}</th>
              <th style="padding: 5px 10px;text-align:right;font-weight: 600;font-size: 12px;">第${that/myData[i].num}名</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style="padding: 5px;font-size: 12px;"<span style="display: inline-block;width: 8px;background-color: ${color};font-size: 0;vertical-align:middle;margin-right: 10px;"></span>></td>
              <td style="padding: 5px 10px;font-size: 12px;">13月继续率</td>
              <td style="padding: 5px 10px;font-size: 12px;">${that.myData[i].quantity}%</td>
            </tr>
            </tbody>
            </table>
            `;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisDataRank,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#2D3576",
                width:1,
                type: "solid",
                opacity: 0.1
              }
            },
            axisTick: {
              show: false //隐藏刻度
            }，
            axisLabel: {
              show: true,
              textStyle: {
                color: "#2D3576"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            data: this.rankData,
            axisTick:{
              show: false
            },
            axisline:{
              show: true,
              lineStyle: {
                color: "#2D3576",
                width:1,
                type: "solid",
                opacity: 0.1
              }
            },
            splitLine: {
              lineStyle: {
                color: "#2D3576",
                opacity:0.1
              }
            },
            min: 0,
            max: 100,
            interval: 20
          }
        ],
        series: [
          {
            name: "NBEV",
            type: "bar",
            data: this.rankData,
            barWidth: 32,//柱子宽度
            barGap: 0.1,//柱子之间间距
            itemStyle: {
              normal: {
                color: function(value) {
                  if(value.name === "本营业区") {
                    return "#F7D381";
                  } else{
                    return "#969AD6";
                  }
                }
              }
            }
          }
        ]
      };
      this.chart.setOption(option, true);
    },
    //防抖动
    debounce(wait ,fn){
      let timer = null;
      return function(){
        clearTimeout(timer);
        timer=setTimeout(function(){
          fn();
        },wait)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.thend {
  height: 220px;
  width: 100%;
}
</style>

```