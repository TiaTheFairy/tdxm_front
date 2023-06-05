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
        profile = res.userInfo;
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
            if(!res.data.status){
              wx.request({
                url: server.default.createUser,
                method: 'POST',
                data:{
                  wxid: app.globalData.wxid,
                  username: profile.nickName,
                  avatar: profile.avatarUrl
                },
                success:(res)=>{
                  if(res.data.status == 'COMPLETE'){
                    wx.downloadFile({
                      url: profile.avatarUrl,
                      success:(res)=>{
                        wx.getFileSystemManager().readFile({
                          filePath: res.tempFilePath,
                          encoding: 'base64',
                          success: function(res){
                            wx.request({
                              url: server.default.uploadPic,
                              method: 'POST',
                              data:{
                                type: 'user',
                                id: app.globalData.wxid,
                                file: res.data
                              } ,
                              success:(res)=>{
                                wx.hideLoading()
                                wx.redirectTo({
                                  url: '../index/index',
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                  else{
                    wx.showToast({
                      title: '请再试一次',
                      icon: 'error'
                    })
                  }
                }
              })
            }
            else{
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
    })
  }
})