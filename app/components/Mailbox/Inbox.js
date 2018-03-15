import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Dimmer, Loader, Image as ImageComponent, Segment, Input, Tab, Feed, Card, Grid } from 'semantic-ui-react'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'

const SenderAbstract = ({message}) => (
  <Feed>
    <Feed.Event>
      <Feed.Label image={require('../../assets/images/avatar/small/christian.jpg')} />
      <Feed.Content>
        <Feed.Summary>{message.senderName}</Feed.Summary>
        <Feed.Extra>
          {message.text.length < 15
            ? message.text
            : `${message.text.substring(0, 15)}...`}
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

const MessageDetail = ({message}) => (
  <Card raised={true} fluid={true}>
    <Card.Content>
      <Card.Meta textAlign='right'>3 days ago</Card.Meta>
      <Card.Header>{message.subject}</Card.Header>
      <Card.Meta>From {message.senderName} to me</Card.Meta>
      <Card.Description><pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Lato'}}>{message.text}</pre></Card.Description>
    </Card.Content>
    <Card.Content extra={true}>
      <Input placeholder='Reply...' />
    </Card.Content>
  </Card>
)

function Inbox ({isFetchingInbox, inboxMessageIds, messages, match}) {
  return (
    isFetchingInbox === true
      ? <Segment>
        <Dimmer active={true} inverted={true}>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <ImageComponent src={require('../../assets/images/wireframe/paragraph.png')} />
      </Segment>
      : <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Menu secondary={true} vertical={true}>
              {inboxMessageIds.map(
                id =>
                  <Menu.Item
                    key={id}
                    as={NavLink}
                    to={`${match.url}/${id}`}
                    content={<SenderAbstract message={messages[id]} key={id}/>}
                    style={{padding: '4px', maxheight: '65px'}}/>
              )}
            </Menu>
          </Grid.Column>
          <Grid.Column width={11}>
            <Switch>
              {inboxMessageIds.map(
                id =>
                  <Route
                    key={id}
                    path={`${match.path}/${id}`}
                    render={
                      props =>
                        <MessageDetail message={messages[id]} />
                    } />
              )}
              <Redirect exact={true} from={`${match.path}`} to={`${match.url}/${inboxMessageIds[0]}`}/>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  )
}
Inbox.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default Inbox
