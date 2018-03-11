import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import reducers from 'redux/modules'
import { App } from 'components'
import 'semantic-ui-css/semantic.min.css'

const history = createHistory()
const middleware = routerMiddleware(history)
export const store = createStore(reducers, compose(
  applyMiddleware(middleware, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
))
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
