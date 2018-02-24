import React, { Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Authenticate } from 'components'
import * as userActionCreators from 'redux/modules/users'
import { store } from '../../index'
import { push } from 'react-router-redux'

class AuthenticateContainer extends Component {
  constructor (props) {
    super(props)

    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth (e, authType) {
    e.preventDefault()

    this.props.fetchAndHandleAuthedUser(authType)
      .then(() => store.dispatch(push('feed')))
  }

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    isFetching: state.users.isFetching,
    error: state.users.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateContainer)
