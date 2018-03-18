import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleMessageRead } from 'redux/modules/unread'
import { MessageSummary } from 'components'

class MessageSummaryContainer extends Component {
  componentDidMount () {
    const {message, unreadNessageIds} = this.props

    if (unreadNessageIds.includes(message.messageId)) {
      this.props.dispatch(handleMessageRead(message))
    }
  }

  render () {
    const {message, unreadNessageIds} = this.props
    return (
      <MessageSummary
        message={message}
        textColor={unreadNessageIds.includes(message.messageId) ? 'black' : 'grey'} />
    )
  }
}

MessageSummaryContainer.propTypes = {
  unreadNessageIds: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ({unread, messages}, props) {
  const messageId = props.messageId
  return {
    unreadNessageIds: unread.messageIds,
    message: messages[messageId],
  }
}

export default connect(
  mapStateToProps
)(MessageSummaryContainer)
