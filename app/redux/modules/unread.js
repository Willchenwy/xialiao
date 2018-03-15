import { addListener } from 'redux/modules/listeners'
import { listenToUsersUnread, deleteFromUsersUnread } from '../../helpers/api'
import { addMultipleMessages } from './messages'
import { formatRemove, formatUnread } from '../../helpers/utils'
import { addNewMessage } from './inbox'

const SETTING_UNREAD_LISTENER = 'SETTING_UNREAD_LISTENER'
const SETTING_UNREAD_LISTENER_FAILURE = 'SETTING_UNREAD_LISTENER_FAILURE'
const SETTING_UNREAD_LISTENER_SUCCESS = 'SETTING_UNREAD_LISTENER_SUCCESS'
const UPDATE_UNREAD = 'UPDATE_UNREAD'
const ADD_TO_LOCAL_READ = 'ADD_TO_LOCAL_READ'
const RESET_LOCAL_READ = 'RESET_LOCAL_READ'
const UPDATE_NAVBAR_NOTIFICATION = 'UPDATE_NAVBAR_NOTIFICATION'

function settingUnreadListener () {
  return {
    type: SETTING_UNREAD_LISTENER,
  }
}

function settingUnreadListenerFailure (error) {
  console.warn(error)
  return {
    type: SETTING_UNREAD_LISTENER_FAILURE,
    error: 'Error setting unread listener',
  }
}

function settingUnreadListenerSuccess () {
  return {
    type: SETTING_UNREAD_LISTENER_SUCCESS,
  }
}

function updateUnread (messageIds) {
  return {
    type: UPDATE_UNREAD,
    messageIds,
  }
}

function addToLocalRead (message) {
  return {
    type: ADD_TO_LOCAL_READ,
    message,
  }
}

function resetLocalRead () {
  return {
    type: RESET_LOCAL_READ,
  }
}

function updateNavBarNotification (notification) {
  return {
    type: UPDATE_NAVBAR_NOTIFICATION,
    notification,
  }
}

export function setAndHandleUnreadListener () {
  return function (dispatch, getState) {
    if (getState().listeners.inbox === true) {
      return
    }

    dispatch(addListener('unread'))
    dispatch(settingUnreadListener())

    const uid = getState().authentication.user.uid
    listenToUsersUnread(uid, ({messages, sortedIds}, initialFetch) => {
      dispatch(addMultipleMessages(messages))

      const localRead = getState().unread.localRead
      const inbox = getState().inbox.messageIds
      const unreadIds = sortedIds.filter(id => !localRead.hasOwnProperty(id))

      dispatch(updateUnread(unreadIds))
      dispatch(updateNavBarNotification(formatUnread(messages, unreadIds)))

      if (unreadIds.length > 0 && inbox.includes(unreadIds[0]) === false) {
        dispatch(addNewMessage(unreadIds[0]))
      }

      if (initialFetch) {
        dispatch(settingUnreadListenerSuccess())
        deleteFromUsersUnread(formatRemove(localRead, uid))
          .then(dispatch(resetLocalRead()))
      }
    }, (error) => (dispatch(settingUnreadListenerFailure(error))))
  }
}

export function handleMessageRead (message, uid) {
  return function (dispatch) {
    const messageId = {[`${message.messageId}`]: true}
    deleteFromUsersUnread(formatRemove(messageId, uid))
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((error) => {
        dispatch(addToLocalRead(message))
        console.warn('Error in remove unread: ', error)
      })
  }
}

const initialState = {
  isFetching: false,
  error: '',
  messageIds: [],
  localRead: {},
  notification: [],
}

export default function unread (state = initialState, action) {
  switch (action.type) {
    case SETTING_UNREAD_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_UNREAD_LISTENER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_UNREAD_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
      }
    case UPDATE_UNREAD:
      return {
        ...state,
        messageIds: action.messageIds,
      }
    case ADD_TO_LOCAL_READ:
      return {
        ...state,
        localRead: {
          ...state.localRead,
          [action.message.messageId]: true,
        },
      }
    case RESET_LOCAL_READ:
      return {
        ...state,
        localRead: {},
      }
    case UPDATE_NAVBAR_NOTIFICATION:
      return {
        ...state,
        notification: action.notification,
      }
    default:
      return state
  }
}
