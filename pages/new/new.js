import * as server from '../../server.js'
import * as utils from '../../utils.js'
var app = getApp()
Page({
  data: {
    name: '',
    location: '',
    oldprice: '',
    newprice: '',
    desc: '',
    pic: ''
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
                type: 'post',
                id: app.globalData.wxid,
                file: res.data
              } ,
              success:(res)=>{
                that.setData({
                  pic: utils.getPostPic(app.globalData.wxid)
                })
                wx.hideLoading()
              }
            })
          }
        })
      },
      fail:(res)=>{
        wx.hideLoading()
      }
    })
  },
  setupInputDesc(e){
    this.setData({
      desc: e.detail.value
    })
  },
  confirmButton(){
    if(this.data.name == '' || this.data.location == '' || this.data.oldprice == '' || this.data.newprice == '' || this.data.desc == '' || this.data.pic == ''){
      wx.showToast({
        title: '请输入所有内容',
        icon: 'error'
      })
    }
    else{
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
          var pages = getCurrentPages();
          var lastpage = pages[pages.length - 2]
          lastpage.getList();
          wx.redirectTo({
            url: '/pages/detail/detail?id=' + res.data.postid,
          })
        }
      })
    }
  }
})
