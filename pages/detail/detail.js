import * as server from '../../server.js'
var app = getApp()
Page({
  data: {
    id: 0,
    posterid: 123,
    title:'暨大1号',
    location: '暨南大学北门糖水',
    oldprice: 15,
    newprice: 10,
    username: '爱探店的暨大er',
    desc: '<start>评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价内容评价<line>内容评价内容评价内容评价内容<end>',
    upvote: 872,
    downvote: 102,
    commentAmount: 3,
    fav: false,
    comments: [{wxid: 123, content: 'contentcontentcontentcontent'},{wxid: 122133, content: 'asddasdsasasasasasasasasasasa'},{wxid: 122333, content: 'qweqweqwqweqweqeqeqewqeqw'}],
    commentsFormat: [],
    showCommentsPop: false,
    showRelativePop: false,
    commentInput: '',
    isAdmin: true,
    isOwner: false,
    showAdminPop: false,
    relatives: [{
      id: 4846411651,
      name: '暨大1号',
      location: '暨南大学北门北门糖水',
      hot: 1352,
      votes: 950,
      comments: 72,
      fav: false
    },{
      id: 543453351,
      name: '暨大2号',
      location: '暨南大学北门北门糖水',
      hot: 1271,
      votes: 770,
      comments: 41,
      fav: true
    },{
      id: 34524254,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 987789,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 47777515,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    },{
      id: 888888999,
      name: '暨大3号号号号号号号号号号号号',
      location: '暨南大学北门北门糖水水水水水水水',
      hot: 770,
      votes: 553,
      comments: 23,
      fav: false
    }],
    relativesEmpty: false,
    myvote: 0
  },
  switchCommentPop(){
    this.closeAllPop('comments');
    if(this.data.commentsFormat.length == 0){
      this.formatComment();
    }
    this.setData({
      showCommentsPop: this.data.showCommentsPop? false : true,
    })
  },
  switchRelativePop(){
    this.closeAllPop('relative');
    if(this.data.relatives.length == 0){
      this.getRelative();
    }
    else{
      this.setData({
        showRelativePop: this.data.showRelativePop ? false : true,
      })
    }
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
  createVote(e){
    wx.request({
      url: server.default.createVote,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
        vote: e.currentTarget.dataset['vote']
      },
      success:(res)=>{
        if(res.data.status == 'COMPLETE') this.getPostDetail();
      }
    })
  },
  deletePost(){
    let that = this;
    wx.showModal({
      title: '你确定要删除吗',
      content:'删除后, 内容不可恢复',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: server.default.deletePost,
            method: 'POST',
            data:{
              postid: that.data.id,
              wxid: app.globalData.wxid,
            },
            success:(res)=>{
              if(res.data.status == 'COMPLETE'){
                that.setData({
                  showAdminPop: false,
                  showCommentsPop: false,
                  showLinkPop: false
                })
                wx.switchTab({
                  url: '../index/index',
                })
              }
            }
          })
        }
        else{
          return;
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
          username: res.data.posterName,
          desc: res.data.desc,
          upvote: res.data.upvote,
          downvote: res.data.downvote,
          fav: JSON.parse(res.data.fav),
          comments: res.data.comments,
          posterid: res.data.posterID
        })
        this.setData({
          commentAmount: this.data.comments.length,
        })
        this.wx.request({
          url: server.default.getUser,
          method: 'POST',
          data:{
            wxid: app.globalData.wxid,
          },
          success:(res)=>{
            if(res.data.userid == app.data.posterID){
              this.setData({
                isOwner: true
              })
            }
          }
        })
        this.formatComment();
        this.getRelative();
      }
    })
  },
  getRelative(){
    let keyword = this.data.title;
    let order = 'price';

    wx.request({
      url: server.default.getListIndex,
      method: 'POST',
      data:{
        keyword: keyword,
        order: order
      },
      success:(res)=>{
        if(res.data.list.length == 0){
          this.setData({
            relativesEmpty: true
          })
        }
        else{
          this.setData({
            relativesEmpty: false,
            relatives: res.data.list
          })
        }
      }
    })
  },
  getAdmin(){
    wx.request({
      url: server.default.getAdmin,
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
    this.closeAllPop('admin');
    if(this.data.isAdmin || this.data.isOwner){
      this.setData({
        showAdminPop: this.data.showAdminPop ? false : true,
      })
    }
  },
  closeAllPop(option){
    this.setData({
      showAdminPop: option == 'admin' ? this.data.showAdminPop:  false,
      showRelativePop: option == 'relative' ? this.data.showRelativePop:false,
      showCommentsPop: option == 'comments' ? this.data.showCommentsPop:false
    })
  },
  formatComment(){
    this.data.commentsFormat = [];
    for(let item of this.data.comments){
      console.log(item);
      wx.request({
        url: server.default.getUser,
        method: 'POST',
        data:{
          wxid: item.poster
        },
        success:(res)=>{
          this.setData({
            commentsFormat : [...this.data.commentsFormat,{
              wxid: item.poster,
              userid: res.data.userid,
              username: res.data.username,
              content: item.content
            }]
          })
        }
      })
    }
  },
  onInput(e){
    this.setData({
      commentInput: e.detail.value
    })
  },
  clearSearch(){
    this.setData({
      commentInput: ''
    })
  },
  onLoad(options){
    wx.nextTick(()=>{
      this.getAdmin();
      this.getPostDetail();
    })
  }
})
