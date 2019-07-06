Page({

  /**
   * 页面的初始数据
   */
  data: {
    numList: [
      {
        num: "1",
        x: 100
      },
      {
        num: "2",
        x: 100
      },
      {
        num: "3",
        x: 100
      },
      {
        num: "4",
        x: 100
      },
      {
        num: "5",
        x: 100
      },
      {
        num: "6",
        x: 100
      },
      {
        num: "7",
        x: 100
      }
      , {
        num: "8",
        x: 100
      }
    ],
  },
  changefunc: function (e) { //手指触摸后移动
    this.setData({
      dangqianweizhi: e.detail.x
    })
  },
  touchendfunc: function (e) { //手指动作后结束 
    console.log('手指动作后结束' + this.data.dangqianweizhi);
    if (this.data.dangqianweizhi <= 45) {
      console.log(3)
      this.setData({
        ['numList[' + e.currentTarget.dataset.index + '].x']: 0
      })
    } else {
      this.setData({
        ['numList[' + e.currentTarget.dataset.index + '].x']: 90
      })
    }
  },
  touchstartfunc: function (e) {
    console.log('手指触摸动作开始' + this.data.numList[e.currentTarget.dataset.index].x)
    for (var i in this.data.numList) {
      if (this.data.numList[i].x == 0) {
        console.log(5)
        this.setData({
          ['numList[' + i + '].x']: 90,
        })
      }
    }
  },
  gopages: function () {
    console.log('跳转')
  }
})
