
const r = require("../../utils/request.js");

const y = require("../../utils/util.js");

const isRequired = () => { throw new Error('param is required'); };

const hello = (name = isRequired()) => { console.log(`hello ${name}`) };

var that;


Page({

  data: {

    uploadinfo:{
      "progressBarBoxStyle":"width:0%",
      "percentage":"0%",
      "img":'/images/zwimg.png'
    },

  },

  onLoad() { 
    that = this; 
    hello("param"); //参数必须，反则抛出isRequired错误
  },

  upload:function(e){

    r.__chooseImage(1,function(q){

      that.setData({ uploadBoxStyle: "top:0px;", "uploadinfo.progressBarBoxStyle": "width:0%", "uploadinfo.percentage": "0%", "uploadinfo.img": "/images/zwimg.png" });

      console.log(q);

      r.__Upload("/api/upload", q.tempFilePaths[0],function(u){

        console.log(u)

      },function(o){

        let uploadinfo = {};

        uploadinfo.progressBarBoxStyle = 'width:' + o.progress + '%';

        uploadinfo.percentage = o.progress + '%';

        uploadinfo.img = q.tempFilePaths[0];

        o.progress == 100 ? y.__Toast("上传成功",1):''

        that.setData({ uploadinfo: uploadinfo });

      })

    })

  },

  saveImg(){
    r.__VftsaveImage("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563620378389&di=647c9cf9571d45c5bc74eff1768898a7&imgtype=0&src=http%3A%2F%2Fpic38.nipic.com%2F20140213%2F9422601_094926378000_2.jpg",function () {
      that.setData({ scopeWritePhotosAlbum: true });
    }) 
  },

  userinfosope(){ that.setData({ userinfosope: true }); },

  userinfoDataClick(e){console.log(e)},

  configqxClick(e){ this.setData({ scopeWritePhotosAlbum: e.detail }) },

  configuserinfosopeqxClick(e) { this.setData({ userinfosope: e.detail }) },

  textfun(e){
    y.__ShowModel("title","content",function(res){
      console.log(res);
      res?console.log("确定"):console.log("取消")
    })
  },
  
  
})