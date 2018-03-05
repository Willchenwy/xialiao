// import { addListener } from 'redux/modules/listeners'
// // import { deleteUnread, listenToInbox, fetchInbox } from 'helpers/api'

// const SETTING_INBOX_LISTENER = 'SETTING_INBOX_LISTENER'
// const SETTING_INBOX_LISTENER_FAILURE = 'SETTING_INBOX_LISTENER_FAILURE'
// const SETTING_INBOX_LISTENER_SUCCESS = 'SETTING_INBOX_LISTENER_SUCCESS'

// const FETCHING_INBOX = 'FETCHING_INBOX'
// const FETCHING_INBOX_FAILURE = 'FETCHING_INBOX_FAILURE'
// const FETCHING_INBOX_SUCCESS = 'FETCHING_INBOX_SUCCESS'
// const REMOVE_FETCHING_INBOX = 'REMOVE_FETCHING_INBOX'
// const UPDATE_UNREAD = 'UPDATE_UNREAD'
// const REMOVE_SINGLE_MESSAGEID_FROM_UNREAD = 'REMOVE_SINGLE_MESSAGEID_FROM_UNREAD'

// export function merageAndHandleNewMessages (localMessages, newMessages, cb1, cb2, cb3) {
//   let unread = []
//   let needToUpdate = []
//   let ret = {}
//   for (var msg in newMessages) {
//     console.log(msg, newMessages[msg])
//     if (localMessages[msg] === null) {
//       ret = {...ret, ...newMessages[msg]}
//       unread = [...unread, ...msg]
//     } else {
//       if (localMessages[msg].isRead === newMessages[msg].isRead) {
//         if (localMessages[msg].isRead === false) {
//           unread = [...unread, ...msg]
//           ret = {...ret, ...newMessages[msg]}
//         } else {
//           ret = {...ret, ...newMessages[msg]}
//         }
//       } else {
//         if (localMessages[msg].isRead === true) {
//           ret = {...ret, ...localMessages[msg]}
//           needToUpdate = [...needToUpdate, ...msg]
//         } else {
//           ret = {...ret, ...newMessages[msg]}
//         }
//       }
//     }
//   }
//   return {unread, needToUpdate, ret}
// }

// export function setAndHandleInboxListener () {
//   return function (dispatch, getState) {
//     if (getState().listeners.inbox === true) {
//       return
//     }

//     dispatch(addListener('inbox'))
//     dispatch(settingInboxListener())

//     listenToInbox(({messages, sortedId}, initialFetch) => {

//       let localMessages = getState('inbox').messages
//       let newMessages = messages
//       let {unread, needToUpdate, ret} = merageAndHandleNewMessages(localMessages, newMessages)
//       dispatch(updateInbox(sortedId))
//       dispatch(updateMessages(ret))
//       dispatch(updateUnread(unread))
//       dispatch(updateResend(needToUpdate))

//       initialFetch && dispatch(settingInboxListenerSuccess())
//     }, (error) => (dispatch(settingInboxListenerFailure(error))))
//   }
// }

// export function handleMessageRead (messageId) {
//   return function (dispatch) {
//     dispatch(removeSingleMessageIdsFromUnread(messageId))
//     deleteUnread(messageId)
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }

// export function fetchAndHandleInbox () {
//   return function (dispatch) {
//     dispatch(fetchingInbox())
//     fetchInbox()
//       .then((messages) => dispatch(fetchingInboxSuccess(messages)))
//       .catch((error) => dispatch(fetchingInboxFailure(error)))
//   }
// }

// export function fetchAndHandleSingleMessage (messageId) {
//   return function (dispatch) {
//     dispatch(fetchingInbox())
//     fetchInbox()
//       .then((message) => dispatch(addSingleMessageToInbox(message)))
//       .catch((error) => dispatch(fetchingInboxFailure(error)))
//   }
// }

// export function settingInboxListener () {
//   return {
//     type: SETTING_INBOX_LISTENER,
//   }
// }

// export function settingInboxListenerFailure (error) {
//   return {
//     type: SETTING_INBOX_LISTENER_FAILURE,
//     error,
//   }
// }

// export function settingInboxListenerSuccess () {
//   return {
//     type: SETTING_INBOX_LISTENER_SUCCESS,
//   }
// }

// export function fetchingInbox () {
//   return {
//     type: FETCHING_INBOX,
//   }
// }

// export function fetchingInboxFailure (error) {
//   console.warn(error)
//   return {
//     type: FETCHING_INBOX_FAILURE,
//     error: 'Error fetching message',
//   }
// }

// export function fetchingInboxSuccess (messages) {
//   return {
//     type: FETCHING_INBOX_SUCCESS,
//     messages,
//   }
// }

// export function removeFetchingInbox () {
//   return {
//     type: REMOVE_FETCHING_INBOX,
//   }
// }

// export function updateUnread (messageIDs) {
//   return {
//     type: UPDATE_UNREAD,
//     messageIDs,
//   }
// }

// export function addSingleMessageToInbox (message) {
//   return {
//     type: ADD_SINGLE_MESSAGE_TO_INBOX,
//     message,
//   }
// }

// export function removeSingleMessageIdsFromUnread (messageId) {
//   return {
//     type: REMOVE_SINGLE_MESSAGEID_FROM_UNREAD,
//     messageId,
//   }
// }

// const initialState = {
//   isFetching: false,
//   settingListener: false,
//   error: '',
//   messages: {},
//   unreadIds: [],
// }

// export function inbox (state = initialState, action) {
//   switch (action.type) {
//     case SETTING_INBOX_LISTENER:
//       return {
//         ...state,
//         settingListener: true,
//       }
//     case SETTING_INBOX_LISTENER_FAILURE:
//       return {
//         ...state,
//         settingListener: false,
//         error: action.error,
//       }
//     case SETTING_INBOX_LISTENER_SUCCESS:
//       return {
//         ...state,
//         settingListener: false,
//         error: '',
//       }
//     case FETCHING_INBOX:
//       return {
//         ...state,
//         isFetching: true,
//       }
//     case FETCHING_INBOX_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         error: action.error,
//       }
//     case FETCHING_INBOX_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         error: '',
//         ...action.messages,
//       }
//     case REMOVE_FETCHING_INBOX:
//       return {
//         ...state,
//         isFetching: false,
//         error: '',
//       }
//     case UPDATE_UNREAD:
//       return {
//         ...state,
//         unreadIds: action.messageIDs,
//       }
//     case ADD_SINGLE_MESSAGE_TO_INBOX:
//       return {
//         ...state,
//         [action.message.messageId]: action.message,
//       }
//     case REMOVE_SINGLE_MESSAGEID_FROM_UNREAD:
//       return {
//         ...state,
//         unreadIds: state.unreadIds.filter((messageId) => action.messageId !== messageId),
//       }
//     default:
//       return state
//   }
// }
