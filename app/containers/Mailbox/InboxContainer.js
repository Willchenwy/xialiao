import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Inbox } from 'components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MessageDetailContainer } from 'containers'

class InboxContainer extends Component {
  render () {
    const {match, inboxMessageIds, isFetchingInbox} = this.props
    return (
      <div>
        <Inbox
          isFetchingInbox={isFetchingInbox}
          inboxMessageIds={inboxMessageIds}
          match={match} />
        <Switch>
          <Route path={`${match.path}/:messageId`} component={MessageDetailContainer} />
          {typeof inboxMessageIds[0] !== 'undefined' &&
					<Redirect exact={true} from={`${match.path}`} to={`${match.url}/${inboxMessageIds[0]}`}/>}
        </Switch>
      </div>
    )
  }
}

InboxContainer.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
}

function mapStateToProps ({inbox}) {
  return {
    isFetchingInbox: inbox.isFetching,
    inboxMessageIds: inbox.messageIds,
  }
}

export default connect(
  mapStateToProps
)(InboxContainer)
