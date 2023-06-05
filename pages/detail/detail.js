import * as server from '../../server.js'
import * as utils from '../../utils.js'
var app = getApp()
Page({
  data: {
    id: 0,
    posterid: 0,
    title:'',
    location: '',
    oldprice: 0,
    newprice: 0,
    username: '',
    desc: '',
    like: 0,
    dislike: 0,
    commentAmount: 0,
    fav: false,
    comments: [],
    commentsFormat: [],
    showCommentsPop: false,
    showRelativePop: false,
    commentInput: '',
    isAdmin: true,
    isOwner: false,
    showAdminPop: false,
    relatives: [],
    relativesEmpty: false,
    myvote: 0,
    isHighlight: false,
    postPic: '../../public/assets/placeholder.png',
    posterPic: '../../public/assets/user.png'
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
    this.setData({
      showRelativePop: this.data.showRelativePop ? false : true,
    })
  },
  createComment(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.createComment,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
        content: this.data.commentInput
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.status == 'COMPLETE') {
          this.getPostDetail();
          this.setData({
            commentInput: ''
          })
        }
      }
    })
  },
  createVote(e){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.createVote,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
        vote: e.currentTarget.dataset['vote']
      },
      success:(res)=>{
        wx.hideLoading()
        if(res.data.status == 'COMPLETE') 
        {
          this.getPostDetail();
        }
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
          wx.showLoading({
            title: '加载中',
            mask: true
          })

          wx.request({
            url: server.default.deletePost,
            method: 'POST',
            data:{
              postid: that.data.id,
              wxid: app.globalData.wxid,
            },
            success:(res)=>{
              wx.hideLoading()
              if(res.data.status == 'COMPLETE'){
                that.setData({
                  showAdminPop: false,
                  showCommentsPop: false,
                  showLinkPop: false
                })
                var pages = getCurrentPages();
                var lastpage = pages[pages.length - 2]
                lastpage.getList();

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
        wx.showToast({
          title: this.data.isHighlight? '取消加精成功' : '加精成功',
          icon: 'success'
        })
        this.setData({
          showAdminPop: false,
          isHighlight: !this.data.isHighlight
        })
      }
    })
  },
  createFav(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.request({
      url: server.default.createFav,
      method: 'POST',
      data:{
        postid: this.data.id,
        wxid: app.globalData.wxid,
      },
      success:(res)=>{
        wx.hideLoading()
        this.setData({
          fav: !this.data.fav
        })
      }
    })
  },
  getPostDetail(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: server.default.getPostDetail,
      method: 'POST',
      data:{
        wxid: app.globalData.wxid,
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
          like: res.data.upvote,
          dislike: res.data.downvote,
          fav: JSON.parse(res.data.fav),
          comments: res.data.comments,
          posterid: res.data.posterID,
          myvote: res.data.vote,
          isHighlight: res.data.isHighlight
        })
        this.setData({
          commentAmount: this.data.comments.length,
        })
        wx.request({
          url: server.default.getUser,
          method: 'POST',
          data:{
            wxid: app.globalData.wxid,
          },
          success:(res)=>{
            wx.hideLoading()
            if(res.data.userid == this.data.posterid){
              this.setData({
                isOwner: true
              })
            }
          }
        })
        this.formatComment();
        this.getRelative();
        this.setData({
          postPic: utils.getPostPic(this.data.id),
          posterPic: utils.getUserPic(this.data.posterid)
        })
      }
    })
  },
  getRelative(){
    wx.request({
      url: server.default.getListIndex,
      method: 'POST',
      data:{
        keyword: this.data.title,
        order: 'hot',
        wxid: app.globalData.wxid
      },
      success:(res)=>{
        if(res.data.list.length != 0){
          this.setData({
            relativesEmpty: false,
            relatives: res.data.list.filter(item=> item.postid != this.data.id)
          })
          this.setData({
            relativesEmpty: this.data.relatives.length == 0? true: false
          })
        }
        else{
          
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
          isAdmin: res.data
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
              content: item.content,
              userPic: utils.getUserPic(res.data.userid)
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
    this.setData({
      id: options.id
    })
    wx.nextTick(()=>{
      this.getAdmin();
      this.getPostDetail();
    })
  }
})
