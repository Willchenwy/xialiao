import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Login } from 'components'
import { login } from '../../redux/modules/authentication'
import { authValidator } from 'helpers/formValidator'

class LoginContainer extends Component {
  handleLogin = ({email, password}) => {
    return this.props.login(email, password)
      .then(response => authValidator(response))
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
  login: PropTypes.func.isRequired,
  loggingIn: PropTypes.any,
  error: PropTypes.string.isRequired,
}

function mapStateToProps ({authentication}) {
  return {
    loggingIn: authentication.loggingIn,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({login}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer)
