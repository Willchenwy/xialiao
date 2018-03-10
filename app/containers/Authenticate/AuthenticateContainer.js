import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Image, Statistic, Menu } from 'semantic-ui-react'
import SignUpContainer from '../../containers/SignUp/SignUpContainer'
import LoginContainer from '../../containers/Login/LoginContainer'

export default class AuthenticateContainer extends Component {
  render () {
    const {match, location} = this.props
    return (
      <div className='login-form'>
        <style>{`
        body > div,
        body > div > div,
        body > div > div > div.container,
        body > div > div > div.container > div.login-form {
          height: 100%;
        }
      `}</style>
        <Grid
          columns={2}
          divided={true}
          style={{ height: '85%' }}
          verticalAlign='middle' >
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Image src={require('../../assets/images/crt425.png')} style={{maxWidth: 200}} centered={true}/>
              <Statistic>
                <Statistic.Value>Xialiao</Statistic.Value>
                <Statistic.Label>瞎聊 / 瞎看 / 瞎玩</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Menu pointing={true} secondary={true} style={{marginLeft: '68px'}}>
                <Menu.Item name='login' active={`${match.url}/login` === `${location.pathname}`}
                  as={Link}
                  to={`${match.url}/login`}/>
                <Menu.Item name='signUp' active={`${match.url}/signUp` === `${location.pathname}`}
                  as={Link}
                  to={`${match.url}/signUp`}/>
              </Menu>
              <Switch>
                <Route path={`${match.path}/login`} component={LoginContainer} />
                <Route path={`${match.path}/signUp`} component = {SignUpContainer} />
                <Redirect to={`${match.url}/login`}/>
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

AuthenticateContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
