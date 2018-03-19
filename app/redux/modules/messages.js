import { fetchMessage } from 'helpers/api'

const ADD_MESSAGE = 'ADD_MESSAGE'
const ADD_MULTIPLE_MESSAGES = 'ADD_MULTIPLE_MESSAGES'
const FETCHING_MESSSAGE = 'FETCHING_MESSSAGE'
const REMOVE_MESSAGE_FETCHING = 'REMOVE_MESSAGE_FETCHING'
const FETCHING_MESSAGE_FAILURE = 'FETCHING_MESSAGE_FAILURE'
const FETCHING_MESSAGE_SUCCESS = 'FETCHING_MESSAGE_SUCCESS'

function fetchingMessage () {
  return {
    type: FETCHING_MESSSAGE,
  }
}
function fetchingMessageSuccess (message) {
  return {
    type: FETCHING_MESSAGE_SUCCESS,
    message,
  }
}
function fetchingMessageFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_MESSAGE_FAILURE,
    error: 'Error fetching message',
  }
}

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
  return dispatch => {
    dispatch(fetchingMessage())

    fetchMessage(messageId, uid, type)
      .then(
        message =>
          dispatch(fetchingMessageSuccess(message))
      )
      .catch(
        error =>
          dispatch(fetchingMessageFailure(error))
      )
  }
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
        error: '',
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
        error: '',
        isFetching: false,
      }
    default:
      return state
  }
}
