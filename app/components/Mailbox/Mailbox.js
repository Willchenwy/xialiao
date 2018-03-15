import React from 'react'
import PropTypes from 'prop-types'
import { Container, Menu } from 'semantic-ui-react'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Inbox from './Inbox'
import Sent from './Sent'

function Mailbox (prop) {
  const {match} = prop
  return (
    <Container text={true}>
      <Menu pointing={true} secondary={true}>
        <Menu.Item
          name='Inbox'
          as={NavLink}
          to={`${match.url}/inbox`} />
        <Menu.Item
          name='Sent'
          as={NavLink}
          to={`${match.url}/sent`}/>
      </Menu>
      <Switch>
        <Route
          path={`${match.path}/inbox`}
          render={
            props =>
              <Inbox {...props}
                isFetchingInbox={prop.isFetchingInbox}
                inboxMessageIds={prop.inboxMessageIds}
                messages={prop.messages} />} />
        <Route
          path={`${match.path}/sent`}
          render={
            props =>
              <Sent {...props}
                isFetchingSent={prop.isFetchingSent}
                sentMessageIds={prop.sentMessageIds}
                messages={prop.messages} />} />
        <Redirect exact={true} from={`${match.path}`} to={`${match.url}/inbox`}/>
      </Switch>
    </Container>
  )
}

Mailbox.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  isFetchingSent: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  sentMessageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default Mailbox
