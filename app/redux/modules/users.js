import { fetchUser } from 'helpers/api'

const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export function fetchAndHandleUser (uid) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return fetchUser(uid)
      .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default:
      return state
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
