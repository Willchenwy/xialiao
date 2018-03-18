import { loginUser, logoutUser, saveUser, signUpUser } from 'helpers/auth'
import { formatUserInfo, randomAvatar } from 'helpers/utils'
import { store } from '../../index'
import { push } from 'react-router-redux'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const LOGOUT = 'LOGOUT'

export function login (email, password) {
  return dispatch => {
    dispatch(request())

    return loginUser(email, password)
      .then(
        user => {
          const userInfo = formatUserInfo(user)
          dispatch(success(userInfo))
          store.dispatch(push('/feed'))
        },
        error => (
          dispatch(failure(error.message))
        )
      )
  }

  function request () { return { type: LOGIN_REQUEST } }
  function success (user) { return { type: LOGIN_SUCCESS, user } }
  function failure (error) { return { type: LOGIN_FAILURE, error } }
}

export function signUp (email, password, displayName) {
  return dispatch => {
    dispatch(request())

    const photoURL = randomAvatar()
    return signUpUser(email, password, displayName, photoURL)
      .then(
        user => {
          console.log(user)
          const userInfo = formatUserInfo(user)
          dispatch(success(userInfo))
          store.dispatch(push('/feed'))
          return userInfo
        }
      )
      .then(
        userInfo => saveUser(userInfo)
      )
      .catch(
        error => dispatch(failure(error.message))
      )
  }

  function request () { return { type: SIGNUP_REQUEST } }
  function success (user) { return { type: SIGNUP_SUCCESS, user } }
  function failure (error) { return { type: SIGNUP_FAILURE, error } }
}

export function logout () {
  return dispatch => {
    logoutUser()
      .then(
        () => {
          dispatch(success())
          store.dispatch(push('/'))
        },
        error => dispatch(failure(error))
      )
  }

  function success () { return { type: LOGOUT } }
  function failure (error) { return { type: LOGOUT_FAILURE, error } }
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
        signingUp: false,
        loggedIn: true,
        user: action.user,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
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
        loggedIn: false,
        user: {},
      }
    default:
      return state
  }
}
