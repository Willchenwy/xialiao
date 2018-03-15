import React from 'react'
import { usersDucksExpirationLength, userExpirationLength,
  repliesExpirationLength } from 'config/constants'

export function formatUserInfo ({ displayName, photoURL = '', uid, localId }) {
  return {
    name: displayName,
    avatar: photoURL,
    uid: uid === undefined ? localId : uid,
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

export function formatMessage ({text, subject}, senderId, senderName, userIds) {
  return {
    senderId,
    senderName,
    receiverId: userIds[0],
    text,
    subject,
    timestamp: Date.now(),
  }
}

export function formatUserList (response, searchQuery) {
  return Object.keys(response)
    .filter((key) => (response[key].name.startsWith(searchQuery)))
    .reduce((userInfo, key) => {
      userInfo.userList = [
        ...userInfo.userList,
        {
          text: response[key].name,
          value: response[key].name,
          image: { avatar: true, src: response[key].avatar },
        },
      ]
      userInfo.userIds = [
        ...userInfo.userIds,
        response[key].uid,
      ]
      return userInfo
    }, {userList: [], userIds: []})
}

export function formatUnread (messages, sortedIds) {
  return sortedIds.reduce((unread, id) => {
    return [
      ...unread,
      {
        timestamp: messages[id].timestamp,
        image: {avatar: true, src: require('../assets/images/avatar/small/christian.jpg')},
        text: `${messages[id].senderName} send you a message`,
      },
    ]
  }, [])
}

export function formatRemove (messageIds, uid) {
  return Object.keys(messageIds)
    .reduce((obj, key) => {
      const path = `${uid}/${key}`
      console.log({'path': path})
      return {
        ...obj,
        [path]: null,
      }
    }, {})
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

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    reply,
    uid,
    avatar,
    timestamp: Date.now(),
  }
}
