// Reference for the firebase schema
// Not valid JS and not used in the project

/users
  /uid
    email
    name
    uid
    avatar

/notifications
  uid
    notificationId
      type
      author
      authorAvatar
      uid (of author)
      duckId
      timestamp

/ducks
  /duckId
    avatar
    duckId
    name
    text
    timestamp
    uid (of duck author)

/likeCount
  /duckId
    0

/userDucks
  uid
    duckId
      avatar
      duckId
      name
      text
      timestamp
      uid (of duck author)

/replies
  /duckId
    /replyId
      name
      comment
      uid
      timestamp
      avatar

/usersLikes
  /uid
    duckId: true

/usersInbox
  /uid
    /messageId
      messageId
      receiverId
      receiverName
      senderAvatar
      senderId
      senderName
      subject
      text
      timestamp

/usersSent
  /uid
    /messageId
      messageId
      receiverId
      receiverName
      senderAvatar
      senderId
      senderName
      subject
      text
      timestamp
  
/usersUnread
  /uid
    /messageId
      messageId
      receiverId
      receiverName
      senderAvatar
      senderId
      senderName
      subject
      text
      timestamp
