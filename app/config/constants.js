import firebase from 'firebase'
var wilddog = require('wilddog')

// var config = {
//   apiKey: 'AIzaSyBIJ2P9a09ao7Zq1YCCx498T_NWSF1T-bg',
//   authDomain: 'xialiao-a623d.firebaseapp.com',
//   databaseURL: 'https://xialiao-a623d.firebaseio.com',
//   projectId: 'xialiao-a623d',
//   storageBucket: 'xialiao-a623d.appspot.com',
//   messagingSenderId: '966116254163',
// }

// firebase.initializeApp(config)

var configWD = {
  syncURL: 'https://wd1610741266ewunnh.wilddogio.com',
  authDomain: 'wd1610741266ewunnh.wilddog.com',
}

wilddog.initializeApp(configWD)

// export const ref = firebase.database().ref()
// export const firebaseAuth = firebase.auth

export const ref = wilddog.sync().ref()
export const wilddogAuth = wilddog.auth()

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
