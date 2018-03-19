import React from 'react'
import PropTypes from 'prop-types'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { Container, Grid, Header, Item, Menu, Divider, Segment } from 'semantic-ui-react'
import UserDuck from './UserDuck'
import UserFollow from './UserFollow'
import UserFriends from './UserFriends'
import { avatars } from 'helpers/images'
import { LongLoading } from 'helpers/loading'

function User ({ noUser, user, isFetching, error, duckIds, match, location }) {
  return (
    <Container text={true}>
      {isFetching === true
        ? <LongLoading />
        : noUser === true
          ? <Header as='h3'>This user does not exist</Header>
          : <Grid>
            <Grid.Row style={{marginTop: '40px'}}>
              <Grid.Column width={16}>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image src={avatars[user.avatar]} />
                      <Item.Content>
                        <Item.Header as='a'>{user.name}</Item.Header>
                        <Item.Meta>
                          <span>United State</span>
                        </Item.Meta>
                        <Item.Description />
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Divider hidden={true}/>
                <Menu pointing={true} secondary={true}>
                  <Menu.Item name='Ducks' active={`${match.url}/duckList` === `${location.pathname}`}
                    as={Link}
                    to={`${match.url}/duckList`}/>
                  <Menu.Item name='follow' active={`${match.url}/follow` === `${location.pathname}`}
                    as={Link}
                    to={`${match.url}/follow`}/>
                  <Menu.Item name='friends' active={`${match.url}/friends` === `${location.pathname}`}
                    as={Link}
                    to={`${match.url}/friends`}/>
                </Menu>
                <Divider hidden={true}/>
                <Switch>
                  <Redirect exact={true} from={`${match.path}`} to={`${match.url}/duckList`}/>
                  <Route
                    path={`${match.path}/duckList`}
                    render={(props) => <UserDuck {...props} duckIds={duckIds} />} />
                  <Route path={`${match.path}/follow`} component={UserFollow} />
                  <Route path={`${match.path}/friends`} component={UserFriends} />
                  <Redirect to={`${match.url}/duckList`}/>
                </Switch>
              </Grid.Column>
            </Grid.Row >
          </Grid>}
      {error && <Header as='h3'>{error}</Header>}
    </Container>
  )
}

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  match: PropTypes.any,
  location: PropTypes.any,
}

export default User
