import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import reducers from 'redux/modules'
import restricted from 'helpers/restricted'

const history = createHistory()
const middleware = routerMiddleware(history)

export const store = createStore(reducers, compose(
  applyMiddleware(middleware, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
))

const persistor = persistStore(store)

const checkAuth = (component) => (
  restricted(component, store)
)
const onBeforeLift = () => {
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <ConnectedRouter history={history}>
        {getRoutes(checkAuth)}
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
