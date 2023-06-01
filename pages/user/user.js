import * as server from '../../server.js'
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.getUser,
      method: 'POST',
      data:{
        wxid: app.globalData.wxid
      },
      success:(res)=>{
        wx.hideLoading()
        this.setData({
          id: res.data.userid,
          nickname: res.data.username
        })
      }
    })
  },
  onLoad(){
    // this.getUserInfo()
  }
})
