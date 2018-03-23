import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from 'redux/modules/authentication'
import { setAndHandleUnreadListener, handleMessageRead } from 'redux/modules/unread'
import { wilddogAuth } from 'config/constants'
import { persistStore } from 'redux-persist'
import { store } from '../../index'

class NavigationContainer extends Component {
  componentDidMount () {
    wilddogAuth.onAuthStateChanged(
      user => {
        console.log(user)
        if (user) {
          this.props.setAndHandleUnreadListener()
          persistStore(store).flush()
        }
      }
    )
  }

  hendleLogout = (e) => {
    const uid = this.props.authedUser.uid
    e.stopPropagation()
    this.props.logout(uid)
  }

  onRead = (message) => {
    this.props.handleMessageRead(message)
  }

  render () {
    return (
      <Navigation
        loggedIn={this.props.loggedIn}
        authedUser={this.props.authedUser}
        location={this.props.location}
        hendleLogout={this.hendleLogout}
        unreadDropdown={this.props.unreadDropdown}
        messageIds={this.props.messageIds}
        messages={this.props.messages}
        isFetching={this.props.isFetching}
        onRead={this.onRead} />
    )
  }
}

NavigationContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  setAndHandleUnreadListener: PropTypes.func.isRequired,
  handleMessageRead: PropTypes.func.isRequired,
  unreadDropdown: PropTypes.array.isRequired,
  messageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

function mapStateToProps ({authentication, router, unread, messages}) {
  return {
    loggedIn: authentication.loggedIn,
    authedUser: authentication.user,
    location: router.location,
    unreadDropdown: unread.notification,
    messageIds: unread.messageIds,
    messages: messages,
    isFetching: unread.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setAndHandleUnreadListener,
    handleMessageRead,
    logout}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer)
