const __appFun = require("../../utils/util.js");

const r = require("../../utils/request.js");

Component({
  data: {
    toggle: '',
    maskActive: ''
  },
  properties: {
    userinfosope: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    userinfosope: function (e) {
      console.log(e)
      e ? this.setData({ toggle: "bottom:0%;", maskActive: 'maskActive' }) : this.setData({ toggle: '', maskActive: '' });
    }
  },
  methods: {
    configqx() {
      this.triggerEvent("configqx", !this.data.userinfosope);
    },
    onGotUserInfo(e){
      console.log(e)
      if (e.detail.errMsg == "getUserInfo:fail auth deny"){
        __appFun.__Toast("请先授权可查看更多信息");
        return;
      }
      console.log("这里需要操作全局登录注册接口")
      r.__login(function(res){
        console.log(res)
      })
      this.triggerEvent("userinfoData",e); //传登录注册请求里返回的用户数据
    },
    stopPageScroll() { return }
  }
})