import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SignUp } from 'components'
import { signUp } from '../../redux/modules/authentication'
import { authValidator } from 'helpers/formValidator'

class SignUpContainer extends Component {
  handleSignUp = ({email, password, displayName}, valid) => {
    return this.props.signUp(email, password, displayName)
      .then(response => authValidator(response))
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
  signUp: PropTypes.func.isRequired,
}

function mapStateToProps ({authentication}) {
  return {
    signingUp: authentication.signingUp,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({signUp}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpContainer)
