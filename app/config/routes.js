import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {
  MainContainer, AuthenticateContainer, HomeContainer, NewMessageContainer,
  FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'

export default function getRoutes (checkAuth) {
  return (
    <MainContainer>
      <Switch>
        <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
        <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
        <Route path='/feed' component={checkAuth(FeedContainer)} />
        <Route path='/duck-detail/:duckId' component={checkAuth(DuckDetailsContainer)}/>
        <Route path='/logout' component={LogoutContainer} />
        <Route path='/user/:uid' component={checkAuth(UserContainer)}/>
        <Route path='/newmessage' component={NewMessageContainer}/>
        <Redirect to='/feed'/>
      </Switch>
    </MainContainer>
  )
}
