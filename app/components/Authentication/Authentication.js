import React from 'react'
import PropTypes from 'prop-types'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Image, Statistic, Menu, Container } from 'semantic-ui-react'
import { SignUpContainer, LoginContainer } from 'containers'

export default function AuthenticateContainer ({match, location}) {
  return (
    <Container className='login-form' text={true}>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.container,
        body > div > div > div.container > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        divided={true}
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            <div>
              <Image src={require('../../assets/images/crt425.png')} style={{maxWidth: 200}} centered={true}/>
              <Statistic>
                <Statistic.Value>Xialiao</Statistic.Value>
                <Statistic.Label>瞎聊 / 瞎看 / 瞎玩</Statistic.Label>
              </Statistic>
            </div>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Grid.Row style={{marginLeft: '68px'}}>
              <Menu pointing={true} secondary={true} widths='two'>
                <Menu.Item name='login' active={`${match.url}/login` === `${location.pathname}`}
                  as={Link}
                  to={`${match.url}/login`}/>
                <Menu.Item name='signUp' active={`${match.url}/signUp` === `${location.pathname}`}
                  as={Link}
                  to={`${match.url}/signUp`}/>
              </Menu>
              <Menu.Item>
                <Switch>
                  <Route path={`${match.path}/login`} component={LoginContainer} />
                  <Route path={`${match.path}/signUp`} component = {SignUpContainer} />
                  <Redirect to={`${match.url}/login`}/>
                </Switch>
              </Menu.Item>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

AuthenticateContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
