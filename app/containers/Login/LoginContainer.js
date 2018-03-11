import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Login } from 'components'
import { login } from '../../redux/modules/authentication'

class LoginContainer extends Component {
  handleLogin = ({email, password}) => {
    this.props.dispatch(login(email, password))
  }

  render () {
    return (
      <Login
        loggingIn={this.props.loggingIn}
        handleLogin={this.handleLogin} />
    )
  }
}

LoginContainer.propTypes = {
  loggingIn: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
}

export default connect(
  ({authentication}) => ({ loggingIn: authentication.loggingIn }),
)(LoginContainer)
