const ADD_MESSAGE = 'ADD_MESSAGE'
const ADD_MULTIPLE_MESSAGES = 'ADD_MULTIPLE_MESSAGES'

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

export default function messages (state = {}, action) {
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
    default:
      return state
  }
}
