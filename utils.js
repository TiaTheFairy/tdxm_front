import * as server from './server.js'

const getUserPic = id =>{
  return server.default.server + '/user/' + id + '.png?' + new Date().getTime() + parseInt(Math.random()*999999)
}

const getPostPic = id =>{
  return server.default.server + '/post/' + id + '.png?' + new Date().getTime() + parseInt(Math.random()*999999)
}

module.exports = {
  getUserPic: getUserPic,
  getPostPic: getPostPic
}