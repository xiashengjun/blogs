---
title: （三）腾讯地图开放平台快速入门
---

## 1.引入腾讯地图

```markup
// 引入SDK核心类
var QQMapWX = require('xxx/qqmap-wx.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: '开发密钥（key）' // 必填
});

```

## 2.获取全国地图信息列表

```markup
//在Page({})中使用下列代码
//页面显示/切入前台时触发
onShow: function() {
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function(res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0]); //打印省份数据
        console.log('城市数据：', res.result[1]); //打印城市数据
        console.log('区县数据：', res.result[2]); //打印区县数据
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
}
```

## 3.获取城市列表

```markup
//在Page({})中使用下列代码
//页面显示/切入前台时触发
onShow: function() {
    var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function(res) {//成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0])
        var city = res.result[0];
        //根据对应接口getCityList返回数据的Id获取区县数据（以北京为例）
        qqmapsdk.getDistrictByCityId({
          // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          id: city[0].id, //对应接口getCityList返回数据的Id，如：北京是'110000'
          success: function(res) {//成功后的回调
            console.log(res);
            console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          },
          fail: function(error) {
            console.error(error);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
}
```

## 4.计算两地之间的距离

```markup
formSubmit(e){
    var _this = this;
    //调用距离计算接口
    qqmapsdk.calculateDistance({
        //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: e.detail.value.start || '', //若起点有数据则采用起点坐标，若为空默认当前地址
        to: e.detail.value.dest, //终点坐标
        success: function(res) {//成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          _this.setData({ //设置并更新distance数据
            distance: dis
          });
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
    });
```
