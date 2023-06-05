import * as server from '../../server.js'
import * as utils from '../../utils.js'
var app = getApp()
Page({
  data: {
    id: 0,
    nickname: "",
    desc: "",
    gender: 0,
    birthday: [2000,1,1],
    campus: 0,
    pic: '',
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
    let that = this;
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
        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].tempFilePath,
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
                that.setData({
                  pic: utils.getUserPic(that.data.id)
                })
              },
            })
          }
        })
      },
      fail:(res)=>{
        wx.hideLoading()
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
          birthday: JSON.parse(res.data.birthday),
          pic: utils.getUserPic(res.data.userid)
        })
      }
    })
  },
  onLoad() {
    this.getUserInfo()
  },
})