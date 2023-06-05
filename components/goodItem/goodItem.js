import * as utils from '../../utils.js'
Component({
  properties: {
    postid: {type:Number, value: 0},
    name: {type: String, value: ''},
    location: {type: String, value: ''},
    hot: {type: Number, value: 0},
    votes: {type: Number, value: 0},
    comments: {type: Number, value: 0},
    fav: {type: Boolean, value: false},
    highlight: {type:Boolean, value:false}
  },
  data: {
    pic: '../../public/assets/placeholder.png'
  },
  methods: {
    gotoDetail(){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + this.properties.postid,
      })
    }
  },
  lifetimes: {
    attached: function(){
      this.setData({
        pic : utils.getPostPic(this.properties.postid)
      })
    }
  }
})
