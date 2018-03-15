import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { NewMessage } from 'components'
import { fetchAndHandleUserList, invalidSearchQuery, sendMessage } from 'redux/modules/newMessage'
import { closeModal } from 'redux/modules/modal'
import { formatMessage } from '../../helpers/utils'

class NewMessageContainer extends Component {
  handleFormSubmit = (formData) => {
    this.props.sendMessage(formatMessage(formData, this.props.authedUser, this.props.senderName, this.props.userIds))
    this.props.closeModal()
  }
  onSearchQueryChane = (searchQuery) => {
    searchQuery = searchQuery.replace(/^[ ]+|[ ]+$/g, '')
    searchQuery === ''
      ? this.props.invalidSearchQuery()
      : this.props.fetchAndHandleUserList(searchQuery)
  }

  render () {
    return (
      <NewMessage
        handleFormSubmit={this.handleFormSubmit}
        handleSubmit={this.props.handleSubmit}
        onSearchQueryChane={this.onSearchQueryChane}
        userList={this.props.pristine ? [] : this.props.userList}
        isFetching={this.props.isFetching}/>
    )
  }
}

NewMessageContainer.propTypes = {
  authedUser: PropTypes.string.isRequired,
  senderName: PropTypes.string.isRequired,
  userIds: PropTypes.array.isRequired,
  userList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  fetchAndHandleUserList: PropTypes.func.isRequired,
  invalidSearchQuery: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

function mapStateToProps ({authentication, newMessage}) {
  return {
    authedUser: authentication.user.uid,
    senderName: authentication.user.name,
    userIds: newMessage.userIds,
    userList: newMessage.userList,
    isFetching: newMessage.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleUserList, invalidSearchQuery, sendMessage, closeModal}, dispatch)
}

const newMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageContainer)

export default reduxForm({
  form: 'newMessage',
})(newMessageContainer)
