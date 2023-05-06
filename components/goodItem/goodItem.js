// components/goodItem/goodItem.js
Component({
  properties: {
    name: '',
    location:'',
    hot: '',
    votes: '',
    comments: '',
    fav: false
  },
  data: {

  },
  methods: {
    gotoDetail(){
      wx.navigateTo({
        url: '../../pages/detail/detail',
      })
    }
  }
})
