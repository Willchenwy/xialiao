import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MessageDetail } from 'components'
import { bindActionCreators } from 'redux'
import { handleMessageRead } from 'redux/modules/unread'
import { fetchAndHandleMessage, removeMessageFetching } from 'redux/modules/messages'
import { sendMessage } from 'redux/modules/newMessage'
import { formatMessageReply } from '../../helpers/utils'

class MessageDetailContainer extends Component {
  componentDidMount () {
    if (this.props.messageAlreadyFetched === false) {
      this.props.fetchAndHandleMessage(this.props.messageId, this.props.authedUser.uid, 'USERSINBOX')
    } else {
      this.props.removeMessageFetching()
    }
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.messageAlreadyFetched) {
      if (this.props.unreadNessageIds.includes(nextProps.messageId)) {
        this.props.handleMessageRead(nextProps.messages[nextProps.messageId])
      }
    }
  }

  handleMessageReply = (formData) => {
    const authedUser = this.props.authedUser
    const orignalMessage = this.props.messages[this.props.messageId]

    const formattedMessage = formatMessageReply(formData, authedUser, orignalMessage)
    this.props.sendMessage(formattedMessage)
  }

  render () {
    return (
      <MessageDetail
        message={this.props.messages[this.props.messageId]}
        isFetching={this.props.isFetching}
        error={this.props.error}
        handleMessageReply={this.handleMessageReply} />
    )
  }
}

MessageDetailContainer.propTypes = {
  error: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  authedUser: PropTypes.object.isRequired,
  messageAlreadyFetched: PropTypes.bool.isRequired,
  fetchAndHandleMessage: PropTypes.func.isRequired,
  removeMessageFetching: PropTypes.func.isRequired,
  handleMessageRead: PropTypes.func.isRequired,
  unreadNessageIds: PropTypes.array.isRequired,
}

function mapStateToProps ({messages, authentication, unread}, props) {
  const messageId = props.match.params.messageId
  return {
    unreadNessageIds: unread.messageIds,
    error: messages.error,
    authedUser: authentication.user,
    messages,
    messageId,
    isFetching: messages.isFetching,
    messageAlreadyFetched: !!messages[messageId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleMessage, removeMessageFetching, sendMessage, handleMessageRead}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetailContainer)
