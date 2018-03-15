import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchAndHandleInbox } from 'redux/modules/inbox'
import { fetchAndHandleSent } from 'redux/modules/sent'
import { Mailbox } from 'components'

class MailboxContainer extends Component {
  componentDidMount () {
    this.props.fetchAndHandleInbox()
    this.props.fetchAndHandleSent()
  }

  render () {
    return (
      <Mailbox
        isFetchingInbox={this.props.isFetchingInbox}
        isFetchingSent={this.props.isFetchingSent}
        inboxMessageIds={this.props.inboxMessageIds}
        sentMessageIds={this.props.sentMessageIds}
        messages={this.props.messages}
        match={this.props.match} />
    )
  }
}

MailboxContainer.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  isFetchingSent: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  sentMessageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  fetchAndHandleInbox: PropTypes.func.isRequired,
  fetchAndHandleSent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps ({inbox, sent, messages}) {
  return {
    isFetchingInbox: inbox.isFetching,
    isFetchingSent: sent.isFetching,
    inboxMessageIds: inbox.messageIds,
    sentMessageIds: sent.messageIds,
    messages: messages,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleInbox, fetchAndHandleSent}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailboxContainer)
