import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { push } from 'react-router-redux'
import * as userActionCreators from 'redux/modules/users'
import { SignUp } from '../../components'
import { store } from '../../index'

class SignUpContainer extends Component {
  handleFormSubmit = (fields) => {
    this.props.handleSignUpUser(fields)
      .then(() => store.dispatch(push('feed')))
  }
  render () {
    return (
      <SignUp
        isSigning={this.props.isSigning}
        handleFormSubmit={this.handleFormSubmit} />
    )
  }
}

function mapStateToProps ({users}) {
  return {
    isSigning: users.isFetching,
    error: users.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...userActionCreators, reset }, dispatch)
}

SignUpContainer.propTypes = {
  isSigning: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  handleSignUpUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpContainer)
