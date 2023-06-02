import * as server from './server.js'

const getUserPic = id =>{
  return server.default.server + '/user/' + id + '.png'
}

const getPostPic = id =>{
  return server.default.server + '/post/' + id + '.png'
}

module.exports = {
  getUserPic: getUserPic,
  getPostPic: getPostPic
}