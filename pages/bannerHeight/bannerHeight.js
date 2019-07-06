var that = '';

var query;

Page({

  data: {

    bannerHeight: '',

    imgUrls: [],

    status: true

  },


  onLoad: function (options) {

    that = this;

    query = wx.createSelectorQuery();

    this.getBannerImg();

  },


  getBannerImg() {

    //轮播数据请求成功响应到视图层

    that.setData({

      imgUrls: [

        { "img": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640&h=200" },

        { "img": "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640&h=200" },

      ]

    })


    if (that.data.status) {

      wx.createSelectorQuery().selectAll('.slide-image').boundingClientRect(function (rects) {

        console.log(rects)

        if (rects.length !== 0) {

          that.setData({ bannerHeight: "height:" + rects[0].height + "px" });

          if (that.data.status) {

            that.getBannerImg();

            setTimeout(() => { that.setData({ status: false }); }, 100)

          }

        }

      }).exec();

    }
  }

})

