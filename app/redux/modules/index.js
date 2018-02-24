import usersReducer from './users'
import modalReducer from './modal'
import ducksReducer from './ducks'
import usersDucksReducer from './usersDucks'
import feedReducer from './feed'
import listenersReducer from './listeners'
import usersLikesReducer from './usersLikes'
import likeCountReducer from './likeCount'
import repliesReducer from './replies'
import { routerReducer } from 'react-router-redux'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
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
})

export default rootReducer
