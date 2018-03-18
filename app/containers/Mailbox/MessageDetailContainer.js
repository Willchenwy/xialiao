import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MessageDetail } from 'components'
import { bindActionCreators } from 'redux'
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
        handleMessageReply={this.handleMessageReply} />
    )
  }
}

MessageDetailContainer.propTypes = {
  messages: PropTypes.object.isRequired,
  messageId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  sendMessage: PropTypes.func.isRequired,
  authedUser: PropTypes.object.isRequired,
  messageAlreadyFetched: PropTypes.bool.isRequired,
  fetchAndHandleMessage: PropTypes.func.isRequired,
  removeMessageFetching: PropTypes.func.isRequired,
}

function mapStateToProps ({messages, authentication}, props) {
  const messageId = props.match.params.messageId
  return {
    authedUser: authentication.user,
    messages,
    messageId,
    isFetching: messages.isFetching,
    messageAlreadyFetched: !!messages[messageId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleMessage, removeMessageFetching, sendMessage}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetailContainer)
