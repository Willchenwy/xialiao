{
  router: {
    location: null
  },
  users: {
    isSettingLintener: false,
    isFetching: true,
    error: '',
    uids: []
  },
  modal: {
    isOpen: false,
    duckText: ''
  },
  ducks: {
    isFetching: true,
    error: ''
  },
  usersDucks: {
    isFetching: true,
    error: ''
  },
  feed: {
    newDucksAvailable: false,
    newDucksToAdd: [],
    isFetching: false,
    error: '',
    duckIds: []
  },
  listeners: {},
  usersLikes: {
    isFetching: false,
    error: ''
  },
  likeCount: {
    isFetching: false,
    error: ''
  },
  replies: {
    isFetching: true,
    error: ''
  },
  newMessage: {
    isFetching: false,
    error: '',
    dropdownOptions: [],
    receiversInfo: []
  },
  form: {},
  messages: {
    isFetching: true,
    error: ''
  },
  unread: {
    isFetching: false,
    error: '',
    messageIds: [],
    localRead: {},
    notification: []
  },
  inbox: {
    isFetching: false,
    error: '',
    messageIds: []
  },
  sent: {
    isFetching: false,
    error: '',
    messageIds: []
  },
  authentication: {
    signingUp: false,
    loggingIn: false,
    loggedIn: false,
    user: {},
    error: ''
  }
}