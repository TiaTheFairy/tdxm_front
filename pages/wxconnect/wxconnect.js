import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    src: '',
    name: 'hello'
  },
  userLogin(){
    let profile;
    wx.getUserProfile({
      desc: '授权微信资料',
      success:(res)=>{
        console.log(res.userInfo);
        profile = res.userInfo;

        wx.showLoading({
          title: '加载中',
          mask: true
        })

        wx.request({
          url: 'server.default.getUser',
          method: 'POST',
          data:{
            wxid: app.globalData.wxid
          },
          success:(res)=>{
            wx.hideLoading()
            if(res.status == 'FAIL_NOMATCH'){
              wx.request({
                url: 'server.default.createUser',
                method: 'POST',
                data:{
                  wxid: app.globalData.wxid,
                  username: profile.nickName,
                  avatar: profile.avatarUrl
                },
                success:(res)=>{
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }
              })
            }
            else{
              wx.navigateTo({
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  }
})