import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'
import { Login } from 'components'
import * as userActionCreators from 'redux/modules/users'
import { store } from '../../index'

class LoginContainer extends Component {
  handleGoogleAndFacebookLogin (e, authType) {
    e.preventDefault()
    console.log(authType)
    this.props.fetchAndHandleAuthedUserWithThirdParty(authType, null)
      .then(() => store.dispatch(replace('feed')))
  }

  handleEmailAndPasswordLogin = (loginCredentials) => {
    this.props.fetchAndHandleAuthedUserWithXialiao(loginCredentials)
      .then(() => store.dispatch(push('/feed')))
  }

  render () {
    return (
      <Login
        isFetching={this.props.isFetching}
        handleEmailAndPasswordLogin={this.handleEmailAndPasswordLogin}
        handleGoogleAndFacebookLogin={this.handleGoogleAndFacebookLogin}/>
    )
  }
}

LoginContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchAndHandleAuthedUserWithThirdParty: PropTypes.func.isRequired,
  fetchAndHandleAuthedUserWithXialiao: PropTypes.func.isRequired,
}

function mapStateToProps (state) {
  return {
    isFetching: state.users.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)
