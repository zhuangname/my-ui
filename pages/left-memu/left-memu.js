const dataList = require("dataList.js");

var that = '';

var query;

Page({

  data: {

    dataList: [],

    idx: 0,

    scrollTop: 0,

    toView:'position0',

    imgUrls: [
      
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',

      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',

      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'

    ],

  },


  onLoad: function (options) {

    that = this;

    this.setData({ dataList: dataList.dataList })

    query = wx.createSelectorQuery();

    wx.createSelectorQuery().selectAll('.position').boundingClientRect(function (rects) {

      that.setData({ positions:rects })

    }).exec();

  },


  switchClassfun(e){

    var e = e.currentTarget.dataset.index;

    this.setData({ idx: e, toView: 'position' + e })

  },


  bindscrollfunc(e){

    var arr = [];

    for(var item of this.data.positions){

      if (item.top <= e.detail.scrollTop){

        arr.push(item);

        console.log(item.top);
        console.log(e.detail.scrollTop)

      }

    }

    this.setData({ idx:arr[arr.length-1].dataset.index })
  },

})