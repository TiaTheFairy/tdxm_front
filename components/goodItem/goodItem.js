// components/goodItem/goodItem.js
Component({
  properties: {
    postid: {type:Number, value: 0},
    name: {type: String, value: ''},
    location: {type: String, value: ''},
    hot: {type: Number, value: 0},
    votes: {type: Number, value: 0},
    comments: {type: Number, value: 0},
    fav: {type: Boolean, value: false},
  },
  data: {

  },
  methods: {
    gotoDetail(){
      wx.navigateTo({
        url: '../../pages/detail/detail?id=' + this.properties.postid,
        
      })
    }
  },
})
