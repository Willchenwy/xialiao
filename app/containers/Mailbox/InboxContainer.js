import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Inbox } from 'components'

class InboxContainer extends Component {
  render () {
    const {match, inboxMessageIds, isFetchingInbox, error} = this.props
    return (
      <Inbox
        isFetchingInbox={isFetchingInbox}
        inboxMessageIds={inboxMessageIds}
        match={match}
        error={error} />
    )
  }
}

InboxContainer.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
}

function mapStateToProps ({messages, inbox}) {
  return {
    error: messages.error,
    isFetchingInbox: inbox.isFetching,
    inboxMessageIds: inbox.messageIds,
  }
}

export default connect(
  mapStateToProps
)(InboxContainer)
