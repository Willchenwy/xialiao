import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Segment, Grid, Container } from 'semantic-ui-react'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import { MessageSummaryContainer, MessageDetailContainer } from 'containers'
import { LongLoading } from '../../helpers/loading'

function Inbox (props) {
  const {isFetchingInbox, inboxMessageIds, match, error} = props
  return (
    <Container style={{width: '1000px'}}>
      <Grid>
        <Grid.Column width={4}>
          {isFetchingInbox === true
            ? <LongLoading />
            : error !== ''
              ? <p>error</p>
              : <Segment compact={true} style={{minHeight: '500px'}} raised={true}>
                <Menu
                  secondary={true}
                  vertical={true}>
                  {inboxMessageIds.map(
                    id =>
                      <Menu.Item
                        key={id}
                        as={NavLink}
                        to={`${match.url}/${id}`}
                        content={<MessageSummaryContainer messageId={id}/>}
                        style={{padding: '4px', maxheight: '65px'}}/>
                  )}
                </Menu>
              </Segment>}
        </Grid.Column>
        <Switch>
          <Route path={`${match.path}/:messageId`} component={MessageDetailContainer} />
          {typeof inboxMessageIds[0] !== 'undefined' && <Redirect exact={true} from={`${match.path}`} to={`${match.url}/${inboxMessageIds[0]}`}/>}
        </Switch>
      </Grid>
    </Container>
  )
}
Inbox.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
}

export default Inbox
