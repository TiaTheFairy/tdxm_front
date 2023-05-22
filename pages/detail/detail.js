import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    id: 0,
    title:'暨大1号',
    location: '暨南大学北门糖水',
    oldprice: 15,
    newprice: 10,
    username: '爱探店的暨大er',
    desc: '<start>评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价<line>内容评价内容评价内容评价内容<end>',
    upvote: 872,
    downvote: 102,
    commentAmount: 41,
    fav: false,
    comments: [],
    showCommentsPop: false,
    showLinkPop: false,
    commentInput: '',
    isAdmin: true,
    showAdminPop: false
  },
  switchCommentPop(){
    this.setData({
      showCommentsPop: this.data.showCommentsPop? false : true
    })
  },
  switchLinkPop(){
    this.setData({
      showLinkPop: this.data.showLinkPop ? false : true
    })
  },
  createComment(){
    wx.request({
      url: server.default.createComment,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
        content: this.data.commentInput
      },
      success:(res)=>{
        if(res.data.status == 'COMPLETE') this.getPostDetail();
      }
    })
  },
  createVote(){
    wx.request({
      url: server.default.createVote,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
        vote: 1
      },
      success:(res)=>{
        if(res.data.status == 'COMPLETE') this.getPostDetail();
      }
    })
  },
  deletePost(){
    wx.request({
      url: server.default.deletePost,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
      },
      success:(res)=>{
        if(res.data.status == 'COMPLETE'){
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
    })
  },
  highlightPost(){
    wx.request({
      url: server.default.highlightPost,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
      },
      success:(res)=>{
        console.log('success highlight');
      }
    })
  },
  createFav(){
    wx.request({
      url: server.default.createFav,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
      },
      success:(res)=>{
        console.log('success fav');
      }
    })
  },
  getPostDetail(){
    wx.request({
      url: server.default.getPostDetail,
      method: 'POST',
      data:{
        postid: this.data.id
      },
      success:(res)=>{
        this.setData({
          title: res.data.title,
          location: res.data.location,
          oldprice: res.data.oldprice,
          newprice: res.data.newprice,
          username: res.data.posterUsername,
          desc: res.data.desc,
          upvote: res.data.upvote,
          downvote: res.data.downvote,
          commentAmount: this.data.comments.length,
          fav: res.data.fav,
          comments: this.data.comments
        })
      }
    })
  },
  getAdmin(){
    wx.request({
      url: 'server.default.getAdmin',
      method: 'POST',
      data:{
        wxid: app.globalData.wxid,
      },
      success:(res)=>{
        this.setData({
          isAdmin: res.isAdmin
        })
      }
    })
  },
  switchAdminPop(){
    if(this.data.isAdmin){
      this.setData({
        showAdminPop: this.data.showAdminPop ? false : true
      })
    }
  },
  onLoad(options){
    wx.nextTick(()=>{
      this.getAdmin();
      this.getPostDetail();
    })
  }
})
