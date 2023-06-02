import * as server from 'server.js'
App({
  onLaunch(){
    wx.login({
      success:(res)=>{
        console.log(res.code);

        wx.request({
          // url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxbbd9f06542d698c7&secret=506e627741e3319512e1bcd426c001fb&js_code=${wxcode}&grant_type=authorization_code`,
          url: server.default.getOpenID,
          method: 'POST',
          data:{
            wxcode: res.code 
          },
          success:(res)=>{
            console.log(res.wxid);
            this.globalData.wxid = res.wxid;

            wx.request({
              url: 'server.default.getUser',
              method: 'POST',
              data:{
                wxid: this.globalData.wxid
              },
              success:(res)=>{
                if(res.status != 'FAIL_NOMATCH'){
                  wx.navigateTo({
                    url: '/pages/index/index',
                  })
                }
                else{
                  wx.navigateTo({
                    url: '/pages/wxconnect/wxconnect',
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
