import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { NewMessage } from 'components'
import * as newMessageActions from 'redux/modules/newMessage'
import { closeModal } from 'redux/modules/modal'
import { formatNewMessage } from '../../helpers/utils'

class NewMessageContainer extends Component {
  handleFormSubmit = (formData) => {
    const authedUser = this.props.authedUser
    const receiversInfo = this.props.receiversInfo[0]

    const formattedMessage = formatNewMessage(formData, authedUser, receiversInfo)
    this.props.sendMessage(formattedMessage)
    this.props.closeModal()
  }

  onSearchQueryChane = (searchQuery) => {
    searchQuery = searchQuery.replace(/^[ ]+|[ ]+$/g, '')
    searchQuery === ''
      ? this.props.invalidSearchQuery()
      : this.props.fetchDropdownOptions(searchQuery)
  }

  render () {
    return (
      <NewMessage
        handleFormSubmit={this.handleFormSubmit}
        handleSubmit={this.props.handleSubmit}
        onSearchQueryChane={this.onSearchQueryChane}
        dropdownOptions={this.props.pristine ? [] : this.props.dropdownOptions}
        isFetching={this.props.isFetching}/>
    )
  }
}

NewMessageContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  receiversInfo: PropTypes.array.isRequired,
  dropdownOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  fetchDropdownOptions: PropTypes.func.isRequired,
  invalidSearchQuery: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

function mapStateToProps ({authentication, newMessage}) {
  return {
    authedUser: authentication.user,
    receiversInfo: newMessage.receiversInfo,
    isFetching: newMessage.isFetching,
    dropdownOptions: newMessage.dropdownOptions,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...newMessageActions, closeModal}, dispatch)
}

const newMessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageContainer)

export default reduxForm({
  form: 'newMessage',
})(newMessageContainer)
