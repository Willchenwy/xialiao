import { inbox } from "./app/redux/modules/inbox";

// Reference for the firebase schema
// Not valid JS and not used in the project

/users
  uid
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
  duckId
    avatar
    duckId
    name
    text
    timestamp
    uid (of duck author)

/likeCount
  duckId
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
  duckId
    replyId
      name
      comment
      uid
      timestamp
      avatar

/usersLikes
  uid
    duckId: true

/mailbox
  uid
    unread
    inbox
      messageIds
        text
        subject
        sender
        receiver
        created
    sent
      messageIds
        text
        title
        sender
        receiver
        created
