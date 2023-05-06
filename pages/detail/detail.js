// user.js
//获取应用实例
var app = getApp()
Page({
  data: {
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
  }
})
