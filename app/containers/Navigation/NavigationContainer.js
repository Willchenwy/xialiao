import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from 'redux/modules/authentication'
import { setAndHandleUnreadListener, handleMessageRead } from 'redux/modules/unread'

class NavigationContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleUnreadListener()
  }

  hendleLogout = (e) => {
    e.stopPropagation()
    this.props.logout()
  }

  onRead = (message, uid) => {
    this.props.handleMessageRead(message, uid)
  }

  render () {
    return (
      <Navigation
        loggedIn={this.props.loggedIn}
        user={this.props.user}
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
  user: PropTypes.object.isRequired,
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
    user: authentication.user,
    location: router.location,
    unreadDropdown: unread.notification,
    messageIds: unread.messageIds,
    messages: messages,
    isFetching: unread.isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({setAndHandleUnreadListener, handleMessageRead, logout}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationContainer)
