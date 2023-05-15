// user.js
//获取应用实例
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
    showLinkPop: false
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
  getPostDetail(){
    wx.request({
      url: '',
      method: 'POST',
      data:{
        id: this.data.id
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
  onLoad(options){
    console.log(options.id);
  }
})
