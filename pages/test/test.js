Page({
  data: {


  },

  productBoxfunc(e){

    var e = e.currentTarget.dataset.index;

    this.setData({

      idx: e,

    });

  }
  
})