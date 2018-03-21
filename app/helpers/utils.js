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
  const keys = Object.keys(avatars)
  return keys[ keys.length * Math.random() << 0 ]
}

export function timeSince (date) {
  let seconds = Math.floor((new Date() - date) / 1000)

  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years ago'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months ago'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days ago'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    if (interval < 48) {
      return '1 day ago'
    }
    return interval + ' hours ago'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    if (interval > 60) {
      return '1 hour ago'
    }
    return interval + ' minutes ago'
  }
  return 'Just now'
}
