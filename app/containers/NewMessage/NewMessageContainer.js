import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { NewMessage } from '../../components'
import { fetchAndHandleUserList, invalidSearchQuery } from '../../redux/modules/newMessage'
import { sendMessage } from '../../redux/modules/messages'
import { formatMessage } from '../../helpers/utils'

export class NewMessageContainer extends Component {
  handleFormSubmit = (formData) => {
    console.log({'formData: ': formData})
    this.props.sendMessage(formatMessage(formData, this.props.authedUser, this.props.userIds))
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
  userIds: PropTypes.array.isRequired,
  userList: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  fetchAndHandleUserList: PropTypes.func.isRequired,
  invalidSearchQuery: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

function mapStateToProps ({users, newMessage}) {
  return {
    authedUser: users.authedId,
    userIds: newMessage.userIds,
    userList: newMessage.userList,
    isFetching: newMessage.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleUserList, invalidSearchQuery, sendMessage}, dispatch)
}

const ReduxForm = reduxForm({
  form: 'newMessage',
})(NewMessageContainer)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxForm)
