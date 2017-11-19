var articlesdata = require("../data/data.js");
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    circular: true,
    articlesData: {}

  },
  onLoad: function (options) {
    this.setData({
      articlesData: articlesdata
    });
  },
  goDetail: function (event) {
    var id = event.currentTarget.dataset.getid;
    wx.navigateTo({
      url: 'article-details/article-details?id='+id,
    })
  }
});