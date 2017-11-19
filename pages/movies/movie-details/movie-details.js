var app = getApp();
var cUrl = app.globalUrl.movieUrl;
var http = app.http;
var util = require('../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = cUrl + '/v2/movie/subject/' + options.id;
    http(url, this.callback);
    wx.showNavigationBarLoading();
  },

  callback: function (res) {
    console.log(res);
    //处理数据
    /*
          1.电影图片：movieImg
          2.电影名称：title
          3.制片国家/地区：country
          4.年代：year
          5.想看人数：wish_count
          6.短评数量：commentCount
          7.原名：original_title
          8.评星：stars
          9.评分：score
          10.导演:director
          11.主演：castsName
          12.电影类型：genres
          13.剧情简介：summary         
          14.主演信息：castsInfo      
      */
    if (res.directors[0]) {
      var director = res.directors[0].name;
    }else {
      var director = null;
    }
    var temp = {
      movieImg: res.images.large,
      title: res.title,
      country: res.countries[0],
      year: res.year,
      wish_count: res.wish_count,
      commentCount: res.comments_count,
      original_title: res.original_title,
      stars: util.getStarArr(res.rating.stars),
      score: res.rating.average,
      director: director,
      castsName: util.castsNametoString(res.casts), //单独处理用'/'隔开
      genres: util.genresToString(res.genres),
      summary: res.summary,
      castsInfo: util.getCastsInfo(res.casts) //单独处理演员头像和名字

    };
    console.log(temp);
    this.setData({
      movieDetail: temp
    });
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})