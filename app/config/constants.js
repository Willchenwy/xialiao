var wilddog = require('wilddog')

var configWD = {
  syncURL: 'https://wd1610741266ewunnh.wilddogio.com',
  authDomain: 'wd1610741266ewunnh.wilddog.com',
}

wilddog.initializeApp(configWD)

export const ref = wilddog.sync().ref()
export const wilddogAuth = wilddog.auth()

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
