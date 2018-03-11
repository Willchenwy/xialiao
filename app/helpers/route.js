import React from 'react'
import { store } from '../index'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedIn = store.getState().authentication.loggedIn
  return (
    <Route {...rest} render={props => (
      loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
    )} />
  )
}

export const PublicRoute = ({ component: Component, ...rest }) => {
  const loggedIn = store.getState().authentication.loggedIn
  return (
    <Route {...rest} render={props => (
      loggedIn === false
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/feed', state: { from: props.location } }} />
    )} />
  )
}
