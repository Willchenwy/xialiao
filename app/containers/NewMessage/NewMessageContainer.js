import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NewMessage } from '../../components'
import { formatMessage } from '../../helpers/utils'
import { saveMessage } from '../../helpers/api'

export class NewMessageContainer extends Component {
  handleFormSubmit = (props) => {
    console.log({'handleFormSubmit received': props})
    let {receiver, subject, text} = props
    saveMessage(formatMessage(text, subject, receiver, this.props.authedUser))
  }

  render () {
    console.log({'NewMessageContainer': this.props})
    return (
      <div>
        <NewMessage
          onSubmit={this.handleFormSubmit}
          handleSubmit={this.props.handleSubmit}/>
      </div>
    )
  }
}

NewMessageContainer.propTypes = {
  authedUser: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = ({users}) => {
  return { authedUser: users.authedId }
}

const ReduxForm = reduxForm({
  form: 'newMessage',
})(NewMessageContainer)

export default connect(
  mapStateToProps,
  null,
)(ReduxForm)
