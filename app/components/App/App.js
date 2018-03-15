import React from 'react'
import { Switch } from 'react-router-dom'
import {
  NavigationContainer, MailboxContainer, FeedContainer,
  UserContainer, DuckDetailsContainer } from 'containers'
import { Home, Authentication } from 'components'
import { PrivateRoute, PublicRoute } from '../../helpers/route'

export default function App () {
  return (
    <div>
      <NavigationContainer />
      <Switch>
        <PublicRoute exact={true} path='/' component={Home} />
        <PublicRoute path='/auth' component={Authentication} />
        <PrivateRoute path='/feed' component={FeedContainer} />
        <PrivateRoute path='/user/:uid' component={UserContainer}/>
        <PrivateRoute path='/duckDetail/:duckId' component={DuckDetailsContainer}/>
        <PrivateRoute path='/mailbox' component={MailboxContainer}/>
        <PrivateRoute render={() => <h1>404 Page not found</h1>}/>
      </Switch>
    </div>
  )
}
