import { fetchUserInbox } from '../../helpers/api'
import { addMultipleMessages } from './messages'

const FETCHING_INBOX = 'FETCHING_INBOX'
const FETCHING_INBOX_FAILURE = 'FETCHING_INBOX_FAILURE'
const FETCHING_INBOX_SUCCESS = 'FETCHING_INBOX_SUCCESS'

function fetchingInbox () {
  return {
    type: FETCHING_INBOX,
  }
}

function fetchingInboxFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_INBOX_FAILURE,
    error: 'Error fetching inbox',
  }
}

function fetchingInboxSuccess (messageIds) {
  return {
    type: FETCHING_INBOX_SUCCESS,
    messageIds,
  }
}

export function fetchAndHandleInbox () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingInbox())
    fetchUserInbox(uid)
      .then((messages) => dispatch(addMultipleMessages(messages)))
      .then(({ messages }) => dispatch(
        fetchingInboxSuccess(
          Object.keys(messages).sort((a, b) => messages[b].timestamp - messages[a].timestamp),
        )
      ))
      .catch((error) => dispatch(fetchingInboxFailure(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  messageIds: [],
}

export function inbox (state = initialState, action) {
  switch (action.type) {
    case FETCHING_INBOX:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_INBOX_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_INBOX_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messageIds: action.messageIds,
      }
    default:
      return state
  }
}
