import { fetchMessage } from 'helpers/api'

const ADD_MESSAGE = 'ADD_MESSAGE'
const ADD_MULTIPLE_MESSAGES = 'ADD_MULTIPLE_MESSAGES'
const FETCHING_MESSSAGE = 'FETCHING_MESSSAGE'
const REMOVE_MESSAGE_FETCHING = 'REMOVE_MESSAGE_FETCHING'
const FETCHING_MESSAGE_FAILURE = 'FETCHING_MESSAGE_FAILURE'
const FETCHING_MESSAGE_SUCCESS = 'FETCHING_MESSAGE_SUCCESS'

export function addMessage (message) {
  return {
    type: ADD_MESSAGE,
    message,
  }
}

export function addMultipleMessages (messages) {
  return {
    type: ADD_MULTIPLE_MESSAGES,
    messages,
  }
}

export function removeMessageFetching () {
  return {
    type: REMOVE_MESSAGE_FETCHING,
  }
}

export function fetchAndHandleMessage (messageId, uid, type) {
  return function (dispatch) {
    dispatch(fetching())

    fetchMessage(messageId, uid, type)
      .then(
        message => dispatch(success(message)),
        error => dispatch(failure(error))
      )
  }

  function fetching () { return { type: FETCHING_MESSSAGE } }
  function success (message) { return { type: FETCHING_MESSAGE_SUCCESS, message } }
  function failure (error) { return { type: FETCHING_MESSAGE_FAILURE, error: `Error fetching message: ${error}` } }
}

const initialState = {
  isFetching: true,
  error: '',
}

export default function messages (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        [action.message.messageId]: action.message,
      }
    case ADD_MULTIPLE_MESSAGES:
      return {
        ...state,
        ...action.messages,
      }
    case FETCHING_MESSSAGE:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_MESSAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.message.messageId]: action.message,
      }
    case FETCHING_MESSAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case REMOVE_MESSAGE_FETCHING:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
