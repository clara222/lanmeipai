var datas = require("../../data/data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artData: {},
    collId: '',
    collect: false,
    isPlayMusic: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    this.setData({
      artData: datas.articlesdata[options.id]
    });
    this.setData({
      collId: options.id
    });
    // 页面加载时判断本地是否存储数据
    var artColls = wx.getStorageSync("artCollection");
    if (artColls) {
      var artCol = artColls[this.data.collId];
      this.setData({
        collect: artCol
      });
    } else {
      var artColls = {};
      artColls[this.data.collId] = false;
      wx.setStorageSync("artCollection", artColls);
    }
  },

  //点击取消收藏或收藏
  setCol: function (event) {
    var artColls = wx.getStorageSync("artCollection");
    var artCol = artColls[this.data.collId];
    artCol = !artCol;
    artColls[this.data.collId] = artCol;
    wx.setStorageSync("artCollection", artColls);
    this.setData({
      collect: artCol
    });
    //弹出框
    wx.showToast({
      title: artCol ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 800,
      mask: true
    })
  },
  share: function () {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到微博', '分享到QQ'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log('用户取消')
      }
    })
  },
  playM: function () {
    var that = this;
    //wx.getBackgroundAudioPlayerState(OBJECT)接口出现错误，此处不能使用
   
    if (this.data.isPlayMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic: false
      });
    }else {
      wx.playBackgroundAudio({
        dataUrl: datas.articlesdata[that.data.collId].musicUrl,
        title: datas.articlesdata[that.data.collId].title,
        coverImgUrl: ''
      });
      this.setData({
        isPlayMusic: true
      });
    }

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: datas.articlesdata[this.data.collId].title,
      path: '/page/user?id=123',
      success: function (res) {
        console.log("转发成功");
      },
      fail: function (res) {
        console.log("转发失败");
      }
    }
  }
 
})