var util = require('../../util/util.js');
var app = getApp();
var commonUrl = app.globalUrl.movieUrl;
var http = app.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headName: '',
    movie: [],
    moreMovie: [],
    startData: 0,
    myUrl: "",
    isfirst: true,
    movieId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = commonUrl + '';
    this.setData({
      headName: options.headName
    });
    switch (options.headName) {
      case "正在热映":
        url += '/v2/movie/in_theaters';
        break;
      case "即将上映":
        url += '/v2/movie/coming_soon';
        break;
      case "Top250":
        url += '/v2/movie/top250';
        break;
    }
    this.setData({
      myUrl: url
    });
    http(url, this.callback);
    wx.showNavigationBarLoading();

  },

  callback: function (res) {
    //处理数据
    var movie = [];
    var moreMovie = this.data.moreMovie;
    var sub = res.subjects;
    for (var k in sub) {
      movie.push(sub[k]);
    }
    for (var i = 0; i < movie.length; i++) {
      //限制电影标题长度
      movie[i].title = util.sliceTitle(movie[i].title, 0, 6);
      //星星数据获取 10 20 30 40-4颗 50-5颗 有几颗星星在star-template中创建几个img,将数据格式变为[1,0,0,0,0] [1,1,0,0,0] [1,1,1,0,0]
      var star = movie[i].rating.stars;
      movie[i].rating.stars = util.getStarArr(star);
    }
    console.log(movie);
    if (!this.data.isfirst) { //判断是否是第一次请求
      moreMovie = moreMovie.concat(movie);
    }else { //第一次请求
      this.data.isfirst = false;
      moreMovie = movie;    
    } 
    this.data.moreMovie = moreMovie;  //需重置视图中的数据
    this.setData({
      movie: moreMovie
    });  
    wx.hideNavigationBarLoading();  //数据得到后隐藏导航条动画
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.headName
    })
  },

  //上拉加载更多 start:0 20 40 60 count:20
  onReachBottom: function () {
    this.data.startData += 20;
    var url = this.data.myUrl + '?start=' + this.data.startData + '&count=20';
    http(url, this.callback);//此处有个问题，就是重新请求回来的数据会覆盖掉原来的，原来的页面被替代了,我们在callback函数中使用数组拼接方法concat拼接
    wx.showNavigationBarLoading();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    this.data.moreMovie = [];
    http(this.data.myUrl, this.callback);
  },

  goMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-details/movie-details?id='+id
    })
  }



})