var that;
const r = require("../../utils/request.js");
Page({

  data: {
    avatarUrl:'',   //用户头像
    haibaoimg:'',   //生成的海报
  },
  onLoad(options){
    that = this;

    wx.downloadFile({
      url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epDpMJ1onECmLJpuHLFfiaJXtj6SXttEwtS6jib7kMbYibibBlAdzPUPoib3G2eo8Ob7V02DLTUxbxPia0Q/132',
      success(res){
        that.setData({ avatarUrl:res.tempFilePath })
        that.huizhi()
      }
    })

  },
  
  huizhi(){
    var context = wx.createCanvasContext('canvas');
    //第一个参数：创建的画布对象
    //第二个参数：矩形的宽
    //第三个参数：矩形的高
    //第四个参数：矩形左上角x轴坐标点，
    //第五个参数：矩形左上角y轴坐标点，
    //第六个参数：绘制的图片的URL
    context.setFillStyle('white')
    context.fillRect(0, 0, 280, 450)

    context.setFillStyle('white')
    context.setShadow(1, 1, 5, '#f1f1f1')
    context.fillRect(20, 80, 240, 350)

    drawCircular(context, 40, 40, 20, 20, this.data.avatarUrl);
    context.setFillStyle("#000")
    context.font = 'normal bold 10px sans-serif';
    context.fillText('@@@',66, 40)
    context.font = 'normal bold 10px sans-serif';
    context.setFillStyle("#666")
    context.fillText('给你推荐了一个好东西', 66, 55)
    context.drawImage('/images/product.jpg',20,80,240,240);
    context.setFillStyle("#FF7868")
    context.font = 'normal bold 14px sans-serif';
    context.fillText('￥', 23, 350)
    context.setFillStyle("#FF7868")
    context.font = 'normal bold 20px sans-serif';
    context.fillText('294.00', 40, 350)
    context.drawImage('/images/erweima.png', 190, 360, 60, 60);

    let product_name = 'JE.LES唐家瑜伽兔立体兔儿兔子卫衣（男女同款内里加绒版）';
    drawProduct(product_name);


    context.stroke()
    context.draw()

    setTimeout(() => {
      console.log('执行绘画')
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'canvas',
        success(res) {
          console.log(res.tempFilePath);
          that.setData({
            haibaoimg: res.tempFilePath
          })
        },
        fail(err){
          console.log(err)
        }
      })
    }, 500)


    function drawCircular(ctx, width, height, x, y, url) {
      var avatarurl_width = width;
      var avatarurl_heigth = height;
      var avatarurl_x = x;
      var avatarurl_y = y;
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(url, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
      ctx.restore()
    }

    function drawProduct(productName){
      if (productName.length > 10) {
        let text1 = productName.substr(0, 10);
        context.setFillStyle("#000")
        context.font = 'normal bold 13px sans-serif';
        context.fillText(text1, 26, 380)

        let text2 = productName.substr(10, productName.length);
        if (text2.length > 10) {
          let text3 = productName.substr(10, 10);
          context.setFillStyle("#000")
          context.font = 'normal bold 13px sans-serif';
          context.fillText(text3 + '...', 24, 400)
        } else {
          context.setFillStyle("#000")
          context.font = 'normal bold 13px sans-serif';
          context.fillText(text2, 26, 400)
        }
      } else {
        let text1 = productName;
        context.setFillStyle("#000")
        context.font = 'normal bold 13px sans-serif';
        context.fillText(text1, 26, 390)
      }
    }

  },

  save_btn(){
    r.__VftsaveImage(this.data.haibaoimg,'tempFilePath', function () {
      that.setData({ scopeWritePhotosAlbum: true });
    })
  },
  configqxClick(e) { this.setData({ scopeWritePhotosAlbum: e.detail }) },

  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
})