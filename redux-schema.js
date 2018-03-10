// Reference for the redux schema (state)
// Not valid JS and not used in the project

{
  users: {
    isAuthed,
    isFetching
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  modal: {
    duck,
    isOpen
  },
  ducks: {
    isFetching,
    error
    [duckId]: {
      lastUpdated,
      info: {
        avatarm
        duckId,
        name,
        text,
        timestamp,
        uid
      }
    }
  },
  likeCount: {
    [duckId]: 0
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      ducksIds: [...duckId]
    }
  },
  usersLikes: {
    duckId: true
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    duckIdsToAdd: [...duckId],
    duckIds: [...duckId]
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      replies: {
        [replyId]: {
          name,
          reply,
          uid,
          timestamp,
          avatar
        }
      }
    }
  },
  listeners: {
    [listenerId]: true，
  },
  message: {
    [messageId]: {
      senderId,
      receiverId,
      text,
      subject,
      timestamp,
      messageId,
    }
  }
  inbox: {
    isFetching,
    error,
    messageIds: [...messageId],
  },
  sent: {
    isFetching,
    error,
    messageIds: [...messageId],
  },
  unread: {
    isFetching,
    error,
    messageIds: [...messageId],
    localRead: {
      messageId: true,
    },
  }
}