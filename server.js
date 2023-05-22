let mainserver = '192.168.0.1'

let servers = {
  server: mainserver,
  getOpenID: mainserver+'/openid',

  createUser: mainserver+'/createUser',
  getUser:mainserver+'/getUser',
  updateUser:mainserver+'/updateUser',
  getAdmin: mainserver+'/getAdmin',

  getPostDetail:mainserver+'/getPostDetail',
  createPost:mainserver+'/createPost',
  deletePost:mainserver+'/deletePost',
  highlightPost:mainserver+'/highlightPost',

  createComment:mainserver+'/createComment',
  createVote:mainserver+'/createVote',

  getListHighlight:mainserver+'/getListHightlight',
  getListIndex:mainserver+'/getListIndex',
  getListFav:mainserver+'/getListFav',
  getListPub:mainserver+'/getListPub',

  createFav:mainserver+'/createFav'
}

export default servers;

//import * as server from ''
//server.default.login