import * as server from 'server.js'
App({
  onLaunch(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.login({
      success:(res)=>{
        wx.request({
          url: server.default.getOpenID,
          method: 'POST',
          data:{
            wxcode: res.code 
          },
          success:(res)=>{
            this.globalData.wxid = JSON.parse(res.data.wxid).openid;
            wx.request({
              url: server.default.getUser,
              method: 'POST',
              data:{
                wxid: this.globalData.wxid
              },
              success:(res)=>{
                wx.hideLoading()
                if(res.data.userid){
                  wx.redirectTo({
                    url: '/pages/index/index',
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  globalData:{
    wxid: -1,
    userEditType: '',
    userEditValue: ''
  }
})
