import { usersDucksExpirationLength, userExpirationLength,
  repliesExpirationLength } from 'config/constants'
import {avatars} from './images'

export function formatUserInfo ({ displayName, photoUrl, photoURL, uid, localId, email }) {
  return {
    name: displayName,
    avatar: photoUrl === undefined ? photoURL : photoUrl,
    uid: uid === undefined ? localId : uid,
    email,
  }
}

export function formatDuck (text, {avatar, name, uid}) {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export function formatNewMessage ({text, subject}, authedUser, receiverInfo) {
  return {
    senderId: authedUser.uid,
    senderName: authedUser.name,
    senderAvatar: authedUser.avatar,
    receiverId: receiverInfo.uid,
    receiverName: receiverInfo.name,
    text,
    subject,
    timestamp: Date.now(),
  }
}

export function formatMessageReply ({text}, authedUser, orignalMessage) {
  return {
    senderId: authedUser.uid,
    senderName: authedUser.name,
    senderAvatar: authedUser.avatar,
    receiverId: orignalMessage.senderId,
    receiverName: orignalMessage.senderName,
    text,
    subject: `Re: ${orignalMessage.subject}`,
    timestamp: Date.now(),
  }
}

export function formatDropdownOptions (response, searchQuery) {
  return Object.keys(response)
    .filter(
      key => response[key].name.startsWith(searchQuery)
    )
    .reduce(
      (obj, key) => {
        obj.dropdownOptions = [
          ...obj.dropdownOptions,
          {
            text: response[key].name,
            value: response[key].name,
            image: { avatar: true, src: avatars[response[key].avatar] },
          },
        ]
        obj.receiversInfo = [
          ...obj.receiversInfo,
          response[key],
        ]
        return obj
      }, {dropdownOptions: [], receiversInfo: []})
}

export function formatUnread (messages, sortedIds) {
  return sortedIds.reduce(
    (unread, id) => {
      return [
        ...unread,
        {
          timestamp: messages[id].timestamp,
          image: {avatar: true, src: avatars[messages[id].senderAvatar]},
          text: `${messages[id].senderName} send you a message`,
        },
      ]
    }, [])
}

export function formatRemove (messageIds, uid) {
  return Object.keys(messageIds)
    .reduce(
      (obj, key) => {
        const path = `${uid}/${key}`
        return {
          ...obj,
          [path]: null,
        }
      }, {})
}

export function formatUser (users) {
  return Object.keys(users)
    .reduce(
      (obj, uid) => {
        return {
          ...obj,
          [uid]: {
            lastUpdated: Date.now(),
            info: users[uid],
          },
        }
      }, {})
}

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    avatar,
    timestamp: Date.now(),
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleUser (timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

export function staleDucks (timestamp) {
  return getMilliseconds(timestamp) > usersDucksExpirationLength
}

export function staleReplies (timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength
}

export function randomAvatar () {
  var keys = Object.keys(avatars)
  return keys[ keys.length * Math.random() << 0 ]
}
