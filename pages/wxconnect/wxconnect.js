// pages/wxconnect/wxconnect.js
Page({
  data: {
    src: '',
    name: 'hello'
  },
  onLoad(){
    //自动登录
  },
  autoLogin(){

  },
  userLogin(){
    wx.getUserProfile({
      desc: '获取信息',
      success:(res)=>{
        console.log(res);

        //注册
        //保存本地cookie
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  }
})