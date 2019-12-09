var __appFun = require("../../utils/util.js");

var r = require('../../utils/request.js'),

app = getApp();

Page({

  data: {

  },

  onLoad: function (options) {

    console.log(__appFun);

    console.log(r)

    //r.__Request("GET", "", {}, function (res) { console.log(res) });
    
  },

  getUserInfo(e){

    console.log(e)

    if (e.detail.errMsg == "getUserInfo:fail auth deny"){

      __appFun.__Toast("请先授权！");

    }else{

      r.__login(function(res){

        console.log(res)

      })

    }

  }

});
