import usersReducer from './users'
import modalReducer from './modal'
import ducksReducer from './ducks'
import usersDucksReducer from './usersDucks'
import feedReducer from './feed'
import listenersReducer from './listeners'
import usersLikesReducer from './usersLikes'
import likeCountReducer from './likeCount'
import newMessageReducer from './newMessage'
import repliesReducer from './replies'
import authenticationReducer from './authentication'
import messagesReducer from './messages'
import unreadReducer from './unread'
import inboxReducer from './inbox'
import sentReducer from './sent'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication'],
}

const rootReducer = persistCombineReducers(persistConfig, {
  router: routerReducer,
  users: usersReducer,
  modal: modalReducer,
  ducks: ducksReducer,
  usersDucks: usersDucksReducer,
  feed: feedReducer,
  listeners: listenersReducer,
  usersLikes: usersLikesReducer,
  likeCount: likeCountReducer,
  replies: repliesReducer,
  newMessage: newMessageReducer,
  form: formReducer,
  messages: messagesReducer,
  unread: unreadReducer,
  inbox: inboxReducer,
  sent: sentReducer,
  authentication: authenticationReducer,
})

export default rootReducer
