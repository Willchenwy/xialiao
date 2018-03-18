import { addMessage } from './messages'
import { addMessageIdToSent } from './sent'
import { formatDropdownOptions } from '../../helpers/utils'
import { fetchUsersByPrefix, saveMessage } from '../../helpers/api'

const INVALID_SEARCH_QUERY = 'INVALID_SEARCH_QUERY'
const FETCHING_DROPDOWN_OPTIONS = 'FETCHING_DROPDOWN_OPTIONS'
const FETCHING_DROPDOWN_OPTIONS_SUCCESS = 'FETCHING_DROPDOWN_OPTIONS_SUCCESS'
const FETCHING_DROPDOWN_OPTIONS_FAILURE = 'FETCHING_DROPDOWN_OPTIONS_FAILURE'

export function invalidSearchQuery () {
  return {
    type: INVALID_SEARCH_QUERY,
  }
}

export function fetchDropdownOptions (searchQuery) {
  return dispatch => {
    dispatch(fetching())

    fetchUsersByPrefix(searchQuery)
      .then(
        response =>
          formatDropdownOptions(response, searchQuery)
      )
      .then(
        formattResponse =>
          dispatch(success(formattResponse))
      )
      .catch(
        error =>
          dispatch(failure(error))
      )
  }

  function fetching () { return { type: FETCHING_DROPDOWN_OPTIONS } }
  function success (formattResponse) { return { type: FETCHING_DROPDOWN_OPTIONS_SUCCESS, formattResponse } }
  function failure (error) { return { type: FETCHING_DROPDOWN_OPTIONS_FAILURE, error: `error fetching user list: ${error}` } }
}

export function sendMessage (message) {
  return dispatch => {
    saveMessage(message)
      .then(
        messageWithId => {
          dispatch(addMessage(messageWithId))
          dispatch(addMessageIdToSent(messageWithId.messageId))
        }
      )
      .catch(
        error =>
          console.warn('Error in sending message: ', error)
      )
  }
}

const initialState = {
  isFetching: false,
  error: '',
  dropdownOptions: [],
  receiversInfo: [],
}

export default function newMessage (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DROPDOWN_OPTIONS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_DROPDOWN_OPTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_DROPDOWN_OPTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        dropdownOptions: action.formattResponse.dropdownOptions,
        receiversInfo: action.formattResponse.receiversInfo,
      }
    case INVALID_SEARCH_QUERY:
      return {
        ...state,
        userList: [],
      }
    default:
      return state
  }
}
