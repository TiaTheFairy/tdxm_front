// user.js
//获取应用实例
var app = getApp()
Page({
  data: {
    id: 2020202020,
    nickname:'爱探店的暨大er',
  },
  gotoUserinfo(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  gotoFav(){
    wx.navigateTo({
      url: '../myfav/myfav',
    })
  },
  gotoPub(){
    wx.navigateTo({
      url: '../mypub/mypub',
    })
  },
  copyID(){
    wx.setClipboardData({
      data: this.data.id.toString(),
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  getUserInfo(){
    wx.request({
      url: 'url',
    })
  },
  onLoad(){
    // this.getUserInfo()
  }
})
