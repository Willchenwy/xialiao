import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SignUp } from 'components'
import { signUp } from '../../redux/modules/authentication'

class SignUpContainer extends Component {
  handleSignUp = ({email, password, displayName}) => {
    this.props.dispatch(signUp(email, password, displayName))
  }

  render () {
    return (
      <SignUp
        signingUp={this.props.signingUp}
        handleSignUp={this.handleSignUp} />
    )
  }
}

SignUpContainer.propTypes = {
  signingUp: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
}

export default connect(
  ({authentication}) => ({ signingUp: authentication.signingUp }),
)(SignUpContainer)
