import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    name: '',
    location: '',
    oldprice: '',
    newprice: '',
    desc: '',
  },
  setupInputName(e){
    this.setData({
      name: e.detail.value
    })
  },
  setupInputLocation(e){
    this.setData({
      location: e.detail.value
    })
  },
  setupInputOldprice(e){
    this.setData({
      oldprice: e.detail.value
    })
  },
  setupInputNewprice(e){
    this.setData({
      newprice: e.detail.value
    })
  },
  insertPic(){
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
                type: 'post',
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
  setupInputDesc(e){
    this.setData({
      desc: e.detail.value
    })
  },
  confirmButton(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.createPost,
      method: 'POST',
      data:{
        name: this.data.name,
        location: this.data.location,
        oldprice: this.data.oldprice,
        newprice: this.data.newprice,
        desc: this.data.desc,
        postID: app.globalData.wxid
      },
      success:(res)=>{
        wx.hideLoading()
        wx.navigateTo({
          url: '../../pages/detail/detail?id=' + res.data.postid,
        })
      }
    })
  }
})
