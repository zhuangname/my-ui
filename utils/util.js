const app = getApp();

function __Toast(title, iconStatus) {       //显示消息提示框
  //success 显示成功图标  none 不显示图标
  wx.showToast({
    title: title,
    icon: iconStatus ? 'success' : 'none',
    mask: true
  })
};

function __VftLogin() {  //验证用户授权是否失效
  var __UserInfo = wx.getStorageSync("__UserInfo");
  !__UserInfo ? (app.globalData.token = __UserInfo.unionid, wx.reLaunch({ url: '' })) : ''; //如果授权过了用户信息在缓存中把用户的openid 传到app.globalData.token 里
};

function __ShowModel(title, content, callback, showCancel, cancelText, cancelColor, confirmText, confirmColor){
  
  console.log(cancelText)

  wx.showModal({
    title: title,                                             //提示的标题
    content: content,                                         //提示的内容
    showCancel: showCancel == undefined ? true : false,       //是否显示取消按钮
    cancelText: cancelText? cancelText: '取消',               //取消按钮的文字
    cancelColor: cancelColor ? cancelColor : '#000000',       //取消按钮的颜色
    confirmText: confirmText ? confirmText : '确定',          //确认按钮的文字
    confirmColor: confirmColor ? confirmColor : '#576B95',    //确认按钮的颜色
    success: function (res) { res.confirm ? callback(true) : callback(false) }
  })

};


module.exports = {

  __VftLogin,

  __Toast,

  __ShowModel

}