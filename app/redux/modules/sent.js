// const FETCHING_SENT = 'FETCHING_SENT'
// const FETCHING_SENT_FAILURE = 'FETCHING_SENT_FAILURE'
// const FETCHING_SENT_SUCCESS = 'FETCHING_SENT_SUCCESS'
// const REMOVE_SENT_FETCHING = 'REMOVE_SENT_FETCHING'
// const ADD_SINGLE_MESSADE_TO_SENT = 'ADD_SINGLE_MESSADE_TO_SENT'

// export function fetchingSent () {
//   return {
//     type: FETCHING_SENT,
//   }
// }

// export function fetchingSentFailure (error) {
//   console.warn(error)
//   return {
//     type: FETCHING_SENT_FAILURE,
//     error: 'Error fetching sent',
//   }
// }

// export function fetchingSentSuccess (messages) {
//   return {
//     type: FETCHING_SENT_SUCCESS,
//     messages,
//   }
// }

// export function removeSentFetching () {
//   return {
//     type: REMOVE_SENT_FETCHING,
//   }
// }

// export function fanoutMessage (message) {

// }

// export function addSingleMessageIDToSent (message) {
//   return {
//     type: ADD_SINGLE_MESSADE_TO_SENT,
//     message,
//   }
// }

// const initialState = {
//   isFetching: false,
//   error: '',
// }

// export default function messages (state = initialState, action) {
//   switch (action.type) {
//     case FETCHING_SENT:
//       return {
//         ...state,
//         isFetching: true,
//       }
//     case FETCHING_SENT_FAILURE:
//       return {
//         ...state,
//         isFetching: false,
//         error: action.error,
//       }
//     case FETCHING_SENT_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         ...action.messages,
//       }
//     case ADD_SINGLE_MESSADE_TO_SENT:
//       return {
//         ...state,
//         [action.message.MessageId]: action.message,
//       }
//     case REMOVE_SENT_FETCHING:
//       return {
//         ...state,
//         isFetching: false,
//         error: '',
//       }
//     default:
//       return state
//   }
// }
