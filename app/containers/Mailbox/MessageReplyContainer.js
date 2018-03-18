import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MessageReply } from 'components'
import { sendMessage } from 'redux/modules/newMessage'
import { formatMessageReply } from '../../helpers/utils'

class MessageReplyContainer extends Component {
  handleFormSubmit = (formData) => {
    const authedUser = this.props.authedUser
    const orignalMessage = this.props.orignalMessage

    const formattedMessage = formatMessageReply(formData, authedUser, orignalMessage)
    this.props.dispatch(sendMessage(formattedMessage))
  }

  render () {
    return (
      <MessageReply
        handleFormSubmit={this.handleFormSubmit}
        handleSubmit={this.props.handleSubmit} />
    )
  }
}

MessageReplyContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  orignalMessage: PropTypes.shape({
    senderAvatar: PropTypes.string.isRequired,
    senderName: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
  }),
}

function mapStateToProps ({authentication}) {
  return {
    authedUser: authentication.user,
  }
}

const messageReplyContainer = connect(
  mapStateToProps
)(MessageReplyContainer)

export default reduxForm({
  form: 'messageReply',
})(messageReplyContainer)
