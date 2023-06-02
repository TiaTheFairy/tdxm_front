import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    id: 123456,
    nickname: "这是我的昵称",
    desc: "这是我的简介这是我的简介这是我的简介这是我的简介这是我的简介",
    gender: 0,
    birthday: [2002,3,1],
    campus: 2
  },
  editInfo(e){
    var params = {
      t: e.currentTarget.dataset.word,
      d: 'default'
    };
    switch (params.t) {
      case 'nickname':
        params.d = this.data.nickname;
        break;
      case 'desc':
        params.d = this.data.desc;
        break;
      case 'gender':
        params.d = this.data.gender;
        break;
      case 'birthday':
        params.d = this.data.birthday;
        break;
      case 'campus':
        params.d = this.data.campus;
        break;
      default:
        break;
    }
    let that = this;
    wx.navigateTo({
      url: '/pages/userinfo/useredit/useredit?p=' + JSON.stringify(params),
    })
  },
  changeAvatar(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    var fs = wx.getFileSystemManager()
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res)=>{
        console.log(res);
        console.log(fs.readFileSync(res.tempFiles[0].tempFilePath));
        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].tempFilePath,
          encoding: 'base64',
          success: function(res){
            console.log(res);
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
              }
            })
          }
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
          nickname: res.data.username,
          desc: res.data.desc,
          gender: res.data.gender,
          campus: res.data.campus,
          birthday: JSON.parse(res.data.birthday)
        })
      }
    })
  },
  onLoad() {
    // getUserInfo()
  },
})