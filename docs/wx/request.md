---
title: （四）网络请求
---

## 基本api

```markup
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
```

## Promise封装网络请求

```markup
const req = {
  _get(url, data) {
    return new Promise((resolve, reject) => {
      let params = data;
      wx.request({
        url: url,
        data: params,
        method: "get",
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      })
    })
  },
  _post(url, data) {
    wx.showLoading({
      title: '正在加载',
    })
    return new Promise((resolve, reject) => {
      let params = data;
      wx.request({
        url: url,
        data: params,
        method: "post",
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        },
        complete() {
          wx.hideLoading();
        }
```