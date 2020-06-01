---
title: （二）权限和交互提示框相关
---

## 1.权限相关

### 获取收货地址

wx.chooseAddress({})

### 获取向用户请求过的权限的状态

wx.getSetting({})

### 询问是否打开权限（之前询问过的）

wx.openSetting({})

### 获取当前位置信息

```markup
wx.getLocation({
    success: function(res) {
      const latitude = res.latitude;//获取当前纬度
      const longitude = res.longitude//获取当前经度
    },
    fail(){
      wx.showModal({
        title: '提醒',
        content: '需要授权位置，否则无法使用此程序',
        success() {
          wx.openSetting({
            success(res) {
            }
          })
        }
      })
    }
  })
```

### 使用微信内置地图查看位置

```markup
wx.getLocation({
 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
 success (res) {
   const latitude = res.latitude
   const longitude = res.longitude
   wx.openLocation({
     latitude,
     longitude,
     scale: 18
   })
 }
})
```

### 获取用户信息

```markup
app.js里面
 // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    cartGoods_list: []
  },
  userInfoReadyCallback(res) {
    this.globalData.userInfo = res.userInfo;

  }

其它页面
const app = getApp()
```

## 2.交互提示框相关

### 显示消息提示框

```markup
wx.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000//延迟的时间
})
```

### 显示模态对话框

```markup
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
```

### 显示 loading 提示框

```markup
wx.showLoading({
  title: '加载中',
	mask: ‘true’
})
setTimeout(function () {
  wx.hideLoading()
}, 2000)
//通常  wx.hideLoading()放在wx.request中的complete中，当请求结束后才会结束提示框。
```

### 从底部伸出菜单

```markup
wx.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})
```

:::danger
1.wx.showLoading 和 wx.showToast 同时只能显示一个

2.wx.showToast 应与 wx.hideToast 配对使用
:::
