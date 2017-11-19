App({
  globalUrl: {
    movieUrl: 'http://api.douban.com/'
  },
  http: function (url,callback,para1,para2) {//将请求封装成函数,在每次发送请求时都携带两个参数传给回调函数，一个是data中的属性，一个是标题的名字,在回调函数中就可以直接用这两个参数
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/xml'//这里有个坑会报错，将json改为xml就好了
      },
      success: function (res) {
        callback(res.data,para1,para2);
      }
    })
  }
})