import { loginUser, logoutUser, saveUser, signUpUser } from 'helpers/auth'
import { formatUserInfo, randomAvatar } from 'helpers/utils'
import { store } from '../../index'
import { push } from 'react-router-redux'
import { removeUnreadListerner,
  removeUsersListerner,
  removeFeedListerner,
} from 'helpers/api'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const LOGOUT = 'LOGOUT'

function loginRequest () {
  return {
    type: LOGIN_REQUEST,
  }
}

function loginSuccess (user) {
  return {
    type: LOGIN_SUCCESS, user,
  }
}

function loginFailure (error) {
  console.warn(error)
  return {
    type: LOGIN_FAILURE,
    error: 'Error login',
  }
}

function signUpRequest () {
  return {
    type: SIGNUP_REQUEST,
  }
}

function signUpSuccess (user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  }
}

function signUpFailure (error) {
  console.warn(error)
  return {
    type: SIGNUP_FAILURE,
    error: 'Error sign up',
  }
}

function logoutSuccess () {
  return {
    type: LOGOUT,
  }
}

function logoutFailure (error) {
  console.warn(error)
  return {
    type: LOGOUT_FAILURE,
    error: 'Error logout',
  }
}

export function login (email, password) {
  return dispatch => {
    dispatch(loginRequest())

    return loginUser(email, password)
      .then(
        user => {
          const userInfo = formatUserInfo(user)
          dispatch(loginSuccess(userInfo))
          store.dispatch(push('/feed'))
        }
      )
      .catch(
        error => (
          dispatch(loginFailure(error))
        )
      )
  }
}

export function signUp (email, password, displayName) {
  return dispatch => {
    dispatch(signUpRequest())

    const photoURL = randomAvatar()
    return signUpUser(email, password, displayName, photoURL)
      .then(
        user => {
          const userInfo = formatUserInfo(user)
          dispatch(signUpSuccess(userInfo))
          store.dispatch(push('/feed'))
          return userInfo
        }
      )
      .then(
        userInfo => saveUser(userInfo)
      )
      .catch(
        error => (
          dispatch(signUpFailure(error.message))
        )
      )
  }
}

export function logout (uid) {
  return dispatch => {
    logoutUser()
      .then(
        () => {
          dispatch(logoutSuccess())
          removeUnreadListerner(uid)
          removeUsersListerner()
          removeFeedListerner()
          store.dispatch(push('/'))
        }
      )
      .catch(
        error => (
          dispatch(logoutFailure(error.message))
        )
      )
  }
}

const iniitialState = {
  signingUp: false,
  loggingIn: false,
  loggedIn: false,
  user: {},
  error: '',
}

export default function authentication (state = iniitialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        error: '',
        signingUp: false,
        loggedIn: true,
        user: action.user,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: '',
        loggingIn: false,
        loggedIn: true,
        user: action.user,
      }
    case SIGNUP_FAILURE:
      return {
        ...state,
        signingUp: false,
        error: action.error,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        error: action.error,
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case LOGOUT:
      return {
        ...state,
        error: '',
        loggedIn: false,
        user: {},
      }
    default:
      return state
  }
}
