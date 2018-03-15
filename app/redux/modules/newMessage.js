import { fetchUserList, saveMessage } from '../../helpers/api'
import { formatUserList } from '../../helpers/utils'
import { addMessage } from './messages'
import { addMessageIdToSent } from './sent'

const FETCHING_USER_LIST = 'FETCHING_USER_LIST'
const FETCHING_USER_LIST_SUCCESS = 'FETCHING_USER_LIST_SUCCESS'
const FETCHING_USER_LIST_FAILURE = 'FETCHING_USER_LIST_FAILURE'
const INVALID_SEARCH_QUERY = 'INVALID_SEARCH_QUERY'
const UPDATE_UID = 'UPDATE_UID'

function fetchingUserList () {
  return {
    type: FETCHING_USER_LIST,
  }
}

function fetchingUserListSuccess (userList) {
  return {
    type: FETCHING_USER_LIST_SUCCESS,
    userList,
  }
}

function fetchingUserListFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_USER_LIST_FAILURE,
    error: 'error fetching user list',
  }
}

function updateUids (userIds) {
  return {
    type: UPDATE_UID,
    userIds,
  }
}

export function invalidSearchQuery () {
  return {
    type: INVALID_SEARCH_QUERY,
  }
}

export function fetchAndHandleUserList (searchQuery) {
  return function (dispatch) {
    dispatch(fetchingUserList())
    fetchUserList(searchQuery)
      .then((response) => formatUserList(response, searchQuery))
      .then(({userList, userIds}) => {
        dispatch(fetchingUserListSuccess(userList))
        dispatch(updateUids(userIds))
      })
      .catch((error) => dispatch(fetchingUserListFailure(error)))
  }
}

export function sendMessage (message) {
  return function (dispatch) {
    saveMessage(message)
      .then((messageWithId) => {
        dispatch(addMessage(messageWithId))
        dispatch(addMessageIdToSent(messageWithId.messageId))
      })
      .catch((error) => console.warn('Error in sending message: ', error))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  userList: [],
  userIds: [],
}

export default function newMessage (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER_LIST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        userList: action.userList,
      }
    case INVALID_SEARCH_QUERY:
      return {
        ...state,
        userList: [],
      }
    case UPDATE_UID:
      return {
        ...state,
        userIds: action.userIds,
      }
    default:
      return state
  }
}
