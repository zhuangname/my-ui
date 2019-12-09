//app.js
var event = require('lib/event.js');
App({
  onLaunch: function () {
    this.getmobile();
    event(this);
  },

  getmobile: function (e) {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.globalData.PhoneWidth = res.windowWidth;
        this.globalData.PhoneHeight = res.windowHeight * (750 / res.windowWidth);
        this.globalData.bili = 750 / res.windowWidth;
      },
    })
  },

  globalData: {
    userInfo: null,
    PhoneHeight: '',
    PhoneWidth: '',
    token: wx.getStorageSync("__UserInfo").openid == undefined ? '' : wx.getStorageSync("__UserInfo").openid,
    url:'https://app.zhiwuxuanlv.com'    //请求路径
  }
})