// const app = getApp();
var that;
Page({
  data: {
    clearbox: true,    //历史搜索记录版块
    value: '',         //input里面的内容
    guanjianciarr: [], //记录搜索关键词
    searchClose: false,//×按钮 hide/show
    productbox: false, //商品的版块 hide / show
    noProduct: false,   //未找到您想要的商品版块 hide / show
    network500: false,
    page: 1,
    limit: 20,
    haha: true
  },
  onLoad() {
    that = this;
    var guanjianciarr = wx.getStorageSync("guanjianciarr"); //初始化取出缓存中的搜索记录数组
    //如果没有的话就初始化一个空数组到缓存，否则就直接更新视图层
    if (!guanjianciarr) { wx.setStorageSync('guanjianciarr', []); } else { this.setData({ guanjianciarr: guanjianciarr }) }
  },
  //input的监听
  searchInputChange(e) {
    var a = e.detail.value.replace(/(^\s*)|(\s*$)/g, "");
    console.log(a)
    if (e.detail.value) {
      this.setData({ searchClose: true, });
    } else {
      this.setData({ searchClose: false, productbox: false, clearbox: true, noProduct: false });
      //搜索记录显示
    }
    this.setData({
      value: a
    })
  },
  //input获取焦点
  searchInputfocus(e) {
    console.log(e)
    if (!e.detail.value) {
      this.setData({ clearbox: true, searchClose: false, productbox: false, noProduct: false })
    }
  },
  //点击×按钮
  clearinput(e) {
    this.setData({ value: '', searchClose: false });
  },
  //点击搜索
  searchfunc(e) {
    var that = this;

    if (this.data.value == "") {
      wx.showToast({
        title: '商品名称不能为空!',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      console.log("请求");
      this.data.page = 1;
      this.setData({ page: this.data.page });

      wx.hideLoading();
      if (true) { //如果请求成功没有数据的操作
        that.setData({ haha: true, clearbox: false, productbox: false, noProduct: true, network500: false })
      } else if (true) {//如果请求成功并且有数据的操作
        that.setData({ haha: true, clearbox: false, productbox: true, noProduct: false, network500: false })
      } else {  //请求失败的操作
        that.setData({ network500: true, haha: false, noProduct: false, })
      }
      
      //如果请求没数据就展示未找到您想要的商品版块  //搜索记录版块隐藏  //商品数据版块隐藏
      //否则就展示商品的数据                      //搜索记录版块隐藏  //未找到您想要的商品版块隐藏
      console.log("记录搜索词")
      if (this.data.guanjianciarr.join(",").indexOf(this.data.value) == -1) {
        console.log("添加");
        this.data.guanjianciarr.push(this.data.value);              //把input值添加到搜索记录数组中
        wx.setStorageSync('guanjianciarr', this.data.guanjianciarr);//在更新缓存中的数组
        this.setData({                                              //在更细视图层
          guanjianciarr: this.data.guanjianciarr
        })
      } else {
        console.log("已经有了")
      }
    }
  },

  //点击清空历史记录
  clearlistfunc() {
    wx.clearStorage();    //清楚缓存中的搜索记录数组
    this.setData({ guanjianciarr: [] });//覆盖视图层的搜索记录数组 初始化为空数组
    wx.setStorageSync('guanjianciarr', this.data.guanjianciarr);  //在添加到缓存更新
  },

  //点击记录的数据
  guanjiancifunc(e) {
    var e = e.currentTarget.dataset.item;
    this.setData({ value: e, searchClose: true });
    this.searchfunc()  //这里请求成功后在把值给到value身上
  },

  goproductDetailfunc(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../productDetail/productDetail?goodsId=' + e.currentTarget.dataset.goodsid,
    })
  },

  onReachBottom() { 
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.data.page += 1;
    this.setData({ page: this.data.page });

    //触碰底部请求数据
    wx.hideLoading();
    if (true) { //如果请求成功没有数据的操作
      wx.showToast({ title: '暂无更多数据', icon: 'none', })
    } else if (true) {//如果请求成功并且有数据的操作
      that.setData({ haha: true, clearbox: false, productbox: true, noProduct: false, network500: false })
    } else {  //请求失败的操作
      that.setData({ network500: true, haha: false, noProduct: false, })
    }

  },
  connectfunc() {
    this.searchfunc();
  }
})
