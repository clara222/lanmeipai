var util = require('../util/util.js');
var app = getApp();
var cUrl = app.globalUrl.movieUrl;
var http = app.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowPlay: {},
    goingPlay: {},
    topNum: {},
    moviePage: true,
    searchPannel: false,
    searchResult: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var nowPlay = cUrl + '/v2/movie/in_theaters?start=0&count=3';
    var goingPlay = cUrl + '/v2/movie/coming_soon?start=0&count=3';
    var topNum = cUrl + '/v2/movie/top250?start=0&count=3';
    http(nowPlay, this.callback, "nowPlay", "正在热映");
    http(goingPlay, this.callback, "goingPlay", "即将上映");
    http(topNum, this.callback, "topNum", "Top250");
  },

  callback: function (res, key, name) {
    //处理数据
    var movie = [];
    var obj = {};    
    var sub = res.subjects;    
    for (var k in sub) {   
      movie.push(sub[k]);
    }
    
    for (var i = 0; i < movie.length;i++) {
      //限制电影标题长度
      movie[i].title = util.sliceTitle(movie[i].title,0,6);
      //星星数据获取 10 20 30 40-4颗 50-5颗 有几颗星星在star-template中创建几个img,将数据格式变为[1,0,0,0,0] [1,1,0,0,0] [1,1,1,0,0]
      var star = movie[i].rating.stars;
      movie[i].rating.stars = util.getStarArr(star);
    }
    console.log(movie); 
    //每一个的key都不同
    obj[key] = {
      headerName: name,
      movie: movie
    };
    this.setData(obj);
    wx.hideNavigationBarLoading();
   
  },

  movieMore: function (event) {
    var headName = event.currentTarget.dataset.headname;
    wx.navigateTo({
      url: 'more-movie/more-movie?headName='+headName,
    })
  },

  goMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'movie-details/movie-details?id=' + id
    })
  },

  //搜索页面
  showSearchPannel: function (event) {
    this.setData({
      moviePage: false,
      searchPannel: true
    });
  },
  clearSearch: function (event) {
    this.setData({
      moviePage: true,
      searchPannel: false,
      searchResult: {},
    });
  },
  getSearchResult: function (event) {
    var value = event.detail.value;
    if (!value) {
      this.setData({
        moviePage: true,
        searchPannel: false
      });
      return;
    }
    var url = cUrl+'/v2/movie/search?q='+value;
    http(url, this.callback, "searchResult");
    wx.showNavigationBarLoading();
  }


  
})