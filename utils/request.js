const app = getApp();

import __appFun from "util.js";

function __Request(method, url, data, callback){          //请求  1.请求方法 2.请求路径 3.请求参数 4.回调

  console.log(app.globalData.token);

  wx.request({
    method: method,
    url: app.globalData.url + url,
    data: data,
    header:{
      "token": app.globalData.token
    },
    success(res) { 
      if (res.data.code !== 200) { __appFun.__Toast(res.data.msg) };
      callback(res);
    },
    fail(err) { __appFun.__Toast("请求失败，请检查网络是否连接"); }
  })

};

function __login(callback){

  wx.login({
    success(code){
      console.log(code)

      wx.getUserInfo({
        withCredentials:true,
        lang:'zh_CN',
        success(userinfo) {
          console.log(userinfo)

          // __Request("GET","/api/user/info",{},
          //   function (res) { callback(res) })

          // 1.调用登录
          // 2.调用成功 success 把信息存入缓存中 key: __UserInfo
          // 3.把 openid 赋值到 app.js 里的 globalData.token

            const USERINFO = userinfo.userInfo;
        
          __Request("POST","/api/auth/login",
            {
              avatarUrl: USERINFO.avatarUrl,
              city: USERINFO.city,
              code: code.code,
              country: USERINFO.country,
              gender: USERINFO.gender,
              language: USERINFO.language,
              nickName: USERINFO.nickName,
              province: USERINFO.province,
              encryptedData: userinfo.encryptedData,
              iv: userinfo.iv,
              rawData: userinfo.rawData,
              signature: userinfo.signature
            },function(res){

              callback(res);
              app.globalData.token = res.data.data.unionid;
              wx.setStorageSync("__UserInfo",res.data.data);

          });

        }

      });

    }
  });

};

function __Upload(url, path, callback, onProgressUpdate){   //上传文件  1.请求路径 2.上传的图片 3.回调 4.监听上传的回调

  var uploadTask = wx.uploadFile({

    url: app.globalData.url + url,
    filePath: path,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data'
      //"token": app.globalData.token  需要token验证就放开注释
    },
    success(res){
      var data = JSON.parse(res.data);
      callback(data)
    },
    fail(err) { __appFun.__Toast("上传失败，请检查网络是否连接"); }
    
  });

  uploadTask.onProgressUpdate((res)=>{

    onProgressUpdate(res)

    console.log('上传进度', res.progress)
    console.log('已经上传的数据长度', res.totalBytesSent)
    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)

  })

};

function __chooseImage(count, callback){    //选择图片    1.最多6张   2.回调
  
  wx.chooseImage({
    count: count > 6 ? 6 : count,
    sizeType: ['original', 'compressed'], //原图 、压缩图
    sourceType: ['album', 'camera'],      //从相册选图 、使用相机
    success(res) {  callback(res) },  
    fail(err) { __appFun.__Toast("选择失败"); }
  })

};

function __previewImage(current, urls){     //预览图片  1.当前显示的图片 2.预览图片的数组

  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: urls        // 需要预览的图片http链接列表
  })

};


function __getImageInfo(src, callback){    //获取图片信息 1.图片路径  2.回调

  wx.getImageInfo({
    src: src,     //图片的路径,可以是相对路径、临时文件路径、存储文件路径、网络图片路径
    success(res) { callback(res) },
    fail(err) { __appFun.__Toast("获取图片信息失败"); }
  })

};


function __VftsaveImage(filePath,type, callback) {     
  //保存图片  1.保存图片的路径 2.类型 网络图片还是本地图片 3.用户未授权 显示去设置页面回调
  console.log(type)
  wx.showLoading({ title: '保存中...', mask:true })

  var lspath = '';

  var saveImageToPhotosAlbum = function (path) {
    console.log(path)
    debugger;
    wx.hideLoading();
    wx.saveImageToPhotosAlbum({  //保存图片
      filePath: path,   //图片文件路径，可以是临时文件路径或永久文件路径，不支持网络图片路径
      success(res) {
        __appFun.__Toast("保存成功");
      },
      fail(err) { 
        __appFun.__Toast("保存图片失败");
      }
    })
  };

  if (type == 'tempFilePath'){  //传过来的是临时文件 、、就不需要在调用转换临时文件 直接保存

    lspath = filePath

  }else{  //传过来的是网络图片

    var lspath = ''; //临时文件路径

    __getImageInfo(filePath, function (res) {    //获取传过来的图片信息，转换成临时路径保存

      console.log(res);
      lspath = res.path;

    })

  }

  // 通过 wx.getSetting 先查询一下用户是否授权了 
  wx.getSetting({
    success(res) {
      console.log(res)
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success(res) {
            console.log(res)
            saveImageToPhotosAlbum(lspath)
          },
          fail(err) {
            console.log(err)
            callback();
            wx.hideLoading();
          }
        })
      } else {
        saveImageToPhotosAlbum(lspath)
      }
    }
  })

};

module.exports = {

  __Request,        //请求

  __Upload,         //上传

  __chooseImage,    //选择图片

  __previewImage,   //预览图片

  __getImageInfo,   //获取图片信息
  
  __VftsaveImage,   //验证保存图片授权

  __login,          //登录

}