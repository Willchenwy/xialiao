import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { wilddogAuth } from 'config/constants'
import NavigationContainer from '../Navigation/NavigationContainer'
import { Container } from 'semantic-ui-react'

class MainContainer extends Component {
  componentDidMount () {
    wilddogAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log({'onAuthStateChanged': user})
        const { displayName, photoURL, uid } = user
        const userInfo = formatUserInfo(displayName, photoURL, uid)
        this.props.authUser(uid)
        this.props.fetchingUserSuccess(uid, userInfo, Date.now())
        this.props.setUsersLikes()
      } else {
        console.log('no user')
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    return this.props.isFetching === true
      ? null
      : <div>
        <NavigationContainer />
        <Container text={true}>
          {this.props.children}
        </Container>
      </div>
  }
}

MainContainer.propTypes = {
  children: PropTypes.any,
  user: PropTypes.any,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeFetchingUser: PropTypes.func.isRequired,
  location: PropTypes.any,
}

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withRouter(connect(
  ({users}) => ({ isFetching: users.isFetching, user: users[users.authedId] }),
  (dispatch) => bindActionCreators({...userActionCreators, ...usersLikesActionCreators}, dispatch)
)(MainContainer))
