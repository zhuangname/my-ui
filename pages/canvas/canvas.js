const app = getApp();
Page({
  canvasIdErrorCallback(e) {
    console.error(e.detail.errMsg)
  },
  onReady(e) {
    // 使用 wx.createContext 获取绘图上下文 context
    const context = wx.createCanvasContext('firstCanvas')
    context.setFillStyle('#fff')
    context.fillRect(0, 0, 380, 710)

    context.drawImage('../../images/top.png', 0, 0, 380, 80)
    context.drawImage('../../images/product.png', 0, 150, 380, 380)

    var avatarurl_width = 60;    //绘制的头像宽度
    var avatarurl_heigth = 60;   //绘制的头像高度
    var avatarurl_x = 20;   //绘制的头像在画布上的位置
    var avatarurl_y = 90;   //绘制的头像在画布上的位置
    var text1 = '@@@';//这是要绘制的文本
    var text2 = '品牌好货秒杀中, 快来抢购！';//这是要绘制的文本
    var text3 = '￥84.9';//这是要绘制的文本
    var text4 = '￥177';//这是要绘制的文本
    var text5 = 'ESTEE LAUDER...';//这是要绘制的文本
    var text6 = '【大牌小祥】新款鲜活亮彩';//这是要绘制的文本
    var text7 = '红石榴面霜';//这是要绘制的文本
    var text8 = '长按扫码上索芙特易购';//这是要绘制的文本
    context.setFontSize(17)
    context.setFillStyle("#666")

    context.save();
    context.beginPath(); //开始绘制
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

    context.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
    context.drawImage('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369419058,1797305489&fm=27&gp=0.jpg', avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片

    context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
    context.drawImage('../../images/erweima.png', 240, 540, 121, 121)

    context.fillText(text1, 90, 114)
    context.setFillStyle("#000")
    context.fillText(text2,90,144)
    context.setFontSize(46)
    context.setFillStyle("red")
    context.fillText(text3, 30, 560)
    context.setFontSize(30)
    context.setFillStyle("#666")
    context.fillText(text4, 38, 600)
    context.setFontSize(24)
    context.setFillStyle("#333")
    context.fillText(text5, 30, 640)
    context.setFontSize(18)
    context.fillText(text6, 24, 670)
    context.fillText(text7, 30, 700)
    context.setFontSize(13)
    context.fillText(text8, 240, 700)
    context.moveTo(35, 590)
    context.lineTo(125, 590)
    context.stroke()
    context.draw()

    
    console.log(app)
    this.PhoneWH();
    var that = this;
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'firstCanvas',
        success(res) {
          console.log(res.tempFilePath);
          that.setData({
            haibaoimg:res.tempFilePath
          })
        }
      })
    }, 500)


  },
  PhoneWH() {
    var canvasHeight = app.globalData.PhoneHeight;
    var canvasWidth = app.globalData.PhoneWidth;
    console.log(canvasWidth+"++++"+canvasHeight)
    this.setData({
      canvasWidth,
      canvasHeight
    })
  },
  haibaoimg(){
    wx.previewImage({
      current: this.data.haibaoimg, // 当前显示图片的http链接
      urls: [this.data.haibaoimg] // 需要预览的图片http链接列表
    })
  }
})