// pages/test/test.js
Page({
  data: {
    group: [
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/c67d9521db939fc8beb9a27b046ef1a3.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180914/02e62ee6cb44213c51976d00e4d21ab2.png",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      },
      {
        src: "https://csdnimg.cn/feed/20180913/8770caaf4959d5be0e6891c9f57efade.jpg",
        show: false,
        def: "https://img.alicdn.com/tps/i3/T1QYOyXqRaXXaY1rfd-32-32.gif"
      }
    ]
  },
  onLoad: function () {
    var that = this;
    this.imgLoading(this.data.group,function(data){
      that.setData({
        group:data
      })
    });
  },
  
  imgLoading(data,callback){
    let DataList = data; // 获取原数据
    for (let i in DataList){
      wx.createIntersectionObserver().relativeToViewport({ bottom: 20 }).observe('.loadImg' + i, (ret) => {
        if (ret.intersectionRatio > 0) {
          DataList[i].show = true
        }
        callback(DataList)
      })
    }
  }
})
