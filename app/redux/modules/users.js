import { authWithThirdParty, authWithXialiao, logout, saveUser, signUpUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'
import { fetchUser } from 'helpers/api'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
// const SIGNING_USER = 'SIGNING_USER'
// const SIGNING_USER_FAILURE = 'SIGNING_USER_FAILURE'
// const SIGNING_USER_SUCCESS = 'SIGNING_USER_SUCCESS'

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

export function unautUser () {
  return {
    type: UNAUTH_USER,
  }
}

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

// function signingUser () {
//   return {
//     type: SIGNING_USER,
//   }
// }

// function signingUserFailure (error) {
//   return {
//     type: SIGNING_USER_FAILURE,
//     error,
//   }
// }

// function signingUserSuccess () {
//   return {
//     type: SIGNING_USER_SUCCESS,
//   }
// }

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export function removeFetchingUser () {
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

export function fetchAndHandleAuthedUserWithThirdParty (authType) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return authWithThirdParty(authType)
      .then(({ user, credential }) => {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        return dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now()))
      })
      .then(({ user }) => saveUser(user))
      .then((user) => dispatch(authUser(user.uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function fetchAndHandleAuthedUserWithXialiao ({email, password}) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return authWithXialiao(email, password)
      .then(({ displayName, photoURL, uid }) => {
        const userInfo = formatUserInfo(displayName, photoURL, uid)
        return dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
      })
      .then(({uid}) => dispatch(authUser(uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function handleSignUpUser ({email, password, displayName}) {
  return function (dispatch) {
    dispatch(fetchingUser())
    return signUpUser(email, password, displayName)
      .then((user) => {
        const { displayName, photoURL, localId } = user
        const userInfo = formatUserInfo(displayName, photoURL, localId)
        return dispatch(fetchingUserSuccess(localId, userInfo, Date.now()))
      })
      .then(({user}) => saveUser(user))
      .then((user) => dispatch(authUser(user.uid)))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unautUser())
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
  isFetching: true,
  // isSigning: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
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
    // case SIGNING_USER:
    //   return {
    //     ...state,
    //     isSigning: true,
    //   }
    // case SIGNING_USER_FAILURE:
    //   return {
    //     ...state,
    //     isSigning: false,
    //     error: action.error,
    //   }
    // case SIGNING_USER_SUCCESS:
    //   return {
    //     ...state,
    //     isSigning: false,
    //   }
    default:
      return state
  }
}
