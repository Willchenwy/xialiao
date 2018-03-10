import { ref } from 'config/constants'

function saveToDucks (duck) {
  const duckId = ref.child('ducks').push({}).key()
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})

  return {
    duckId,
    duckPromise,
  }
}

function saveToUsersDucks (duck, duckId) {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

function saveLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

function saveToUsersInbox (message) {
  const messageId = ref.child(`usersInbox/${message.receiverId}`).push({}).key()
  const messagePromise = ref.child(`usersInbox/${message.receiverId}/${messageId}`)
    .set({...message, messageId})

  return {
    messageId,
    messagePromise,
  }
}

function saveToUsersSent (messageId, message) {
  return ref.child(`usersSent/${message.senderId}/${messageId}`)
    .set({...message, messageId})
}

function saveToUsersUnread (messageId, message) {
  return ref.child(`uersUnread/${message.receiverId}/${messageId}`)
    .set(message.timestamp)
}

export function saveMessage (message) {
  console.log({'calling api to save message: ': message})
  const {messageId, messagePromise} = saveToUsersInbox(message)

  return Promise.all([
    messagePromise,
    saveToUsersSent(messageId, message),
    saveToUsersUnread(messageId, message),
  ]).then(() => ({...message, messageId}))
}

export function listenToFeed (cb, errorCb) {
  let timesCalled = 0
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })

    let initialFetch = timesCalled++ <= 0
    cb({feed, sortedIds}, initialFetch)
  }, errorCb)
}

export function listenToUsersUnread (uid, cb, errorCb) {
  let timesCalled = 0
  ref.child(`uersUnread/${uid}`).on('value', (snapshot) => {
    const unread = snapshot.val() || {}
    const sortedIds = Object.keys(unread).sort((a, b) => {
      return unread[b].timestamp - unread[a].timestamp
    })

    let initialFetch = timesCalled++ <= 0
    cb({messages, sortedIds}, initialFetch)
  }, errorCb)
}

export function deleteFromUsersUnread (messages) {
  return ref.child('usersUnread')
    .update(messages)
}

export function fetchUserInbox (uid) {
  return ref.child(`usersInbox/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUserSent (uid) {
  return ref.child(`usersSent/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}

export function deleteFromUsersLikes (uid, duckId) {
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)
}

export function incrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementNumberOfLikes (duckId) {
  return ref.child(`likeCount/${duckId}`)
    .transaction((currentValue = 0) => currentValue - 1)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchUsersDucks (uid) {
  return ref.child(`usersDucks/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchDuck (duckId) {
  return ref.child(`ducks/${duckId}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function fetchLikeCount (duckId) {
  return ref.child(`likeCount/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || 0)
}

export function postReply (duckId, reply) {
  const replyId = ref.child(`replies/${duckId}`).push({}).key()
  const replyWithId = {...reply, replyId}
  const replyPromise = ref.child(`replies/${duckId}/${replyId}`).set(replyWithId)

  return {
    replyWithId,
    replyPromise,
  }
}

export function fetchReplies (duckId) {
  return ref.child(`replies/${duckId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUserList (searchQuery) {
  console.log(`calling api to fetch user list with: ${searchQuery}`)
  return ref.child('users')
    .orderByChild('name')
    .startAt(searchQuery)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
}
