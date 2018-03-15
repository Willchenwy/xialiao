import { fetchUser, listenToUsers } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'

const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const SETTING_USERS_LISTENER = 'SETTING_USERS_LISTENER'
const SETTING_USERS_LISTENER_FAILURE = 'SETTING_USERS_LISTENER_FAILURE'
const SETTING_USERS_LISTENER_SUCCESS = 'SETTING_USERS_LISTENER_SUCCESS'
const ADD_NEW_USER_TO_USERS = 'ADD_NEW_USER_TO_USERS'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'

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

function settingUsersListener () {
  return {
    type: SETTING_USERS_LISTENER,
  }
}

function settingUsersListenerFailure (error) {
  console.warn(error)
  return {
    type: SETTING_USERS_LISTENER_FAILURE,
    error: 'Error fetching users',
  }
}

function settingUsersListenerSuccess (uids) {
  return {
    type: SETTING_USERS_LISTENER_SUCCESS,
    uids,
  }
}

function addNewUserToUsers (uid) {
  return {
    type: ADD_NEW_USER_TO_USERS,
    uid,
  }
}

function addMultipleUsers (users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
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

export function setAndHandleUsersListener () {
  return function (dispatch, getState) {
    if (getState().listeners.users === true) {
      return
    }

    dispatch(addListener('users'))
    dispatch(settingUsersListener())

    listenToUsers(({users, uids}, initialFetch) => {
      dispatch(addMultipleUsers(Object.keys(users)
        .reduce((obj, uid) => {
          return {
            ...obj,
            [uid]: {
              lastUpdated: Date.now(),
              info: users[uid],
            },
          }
        }, {})
      ))
      initialFetch === true
        ? dispatch(settingUsersListenerSuccess(uids))
        : dispatch(addNewUserToUsers(uids[0]))
    }, (error) => dispatch(settingUsersListenerFailure(error)))
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
  isSettingLintener: false,
  isFetching: true,
  error: '',
  uids: [],
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
    case SETTING_USERS_LISTENER:
      return {
        ...state,
        isSettingLintener: true,
      }
    case SETTING_USERS_LISTENER_FAILURE:
      return {
        ...state,
        error: action.error,
        isSettingLintener: false,
      }
    case SETTING_USERS_LISTENER_SUCCESS:
      return {
        ...state,
        uids: action.uids,
        isSettingLintener: false,
      }
    case ADD_NEW_USER_TO_USERS:
      return {
        ...state,
        uids: [
          action.uid,
          ...state.uids,
        ],
      }
    case ADD_MULTIPLE_USERS:
      return {
        ...state,
        ...action.users,
      }
    default:
      return state
  }
}
