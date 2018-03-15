import { fetchUserSent } from '../../helpers/api'
import { addMultipleMessages } from './messages'

const FETCHING_SENT = 'FETCHING_SENT'
const FETCHING_SENT_FAILURE = 'FETCHING_SENT_FAILURE'
const FETCHING_SENT_SUCCESS = 'FETCHING_SENT_SUCCESS'
const ADD_MESSAGEID_TO_SENT = 'ADD_MESSAGEID_TO_SENT'

function fetchingSent () {
  return {
    type: FETCHING_SENT,
  }
}

function fetchingSentFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_SENT_FAILURE,
    error: 'Error fetching sent',
  }
}

function fetchingSentSuccess (messageIds) {
  return {
    type: FETCHING_SENT_SUCCESS,
    messageIds,
  }
}

export function addMessageIdToSent (messageId) {
  return {
    type: ADD_MESSAGEID_TO_SENT,
    messageId,
  }
}

export function fetchAndHandleSent () {
  return function (dispatch, getState) {
    const uid = getState().authentication.user.uid
    dispatch(fetchingSent())
    fetchUserSent(uid)
      .then((messages) => dispatch(addMultipleMessages(messages)))
      .then(({ messages }) => dispatch(
        fetchingSentSuccess(
          Object.keys(messages).sort((a, b) => messages[b].timestamp - messages[a].timestamp),
        )
      ))
      .catch((error) => dispatch(fetchingSentFailure(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
  messageIds: [],
}

export default function sent (state = initialState, action) {
  switch (action.type) {
    case FETCHING_SENT:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_SENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_SENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        messageIds: action.messageIds,
      }
    case ADD_MESSAGEID_TO_SENT:
      return {
        ...state,
        messageIds: [
          action.messageId,
          ...state.messageIds,
        ],
      }
    default:
      return state
  }
}
