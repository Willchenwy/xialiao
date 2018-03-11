import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/authentication'

const mailOptions = [
  { key: 'mail', text: 'No mail' },
]

const alarmOptions = [
  { key: 'notification', text: 'No notification' },
]

class NavigationContainer extends Component {
  hendleLogout = (e) => {
    e.stopPropagation()
    this.props.dispatch(logout())
  }

  render () {
    return (
      <Navigation
        loggedIn={this.props.loggedIn}
        user={this.props.user}
        mailOptions={mailOptions}
        alarmOptions={alarmOptions}
        location={this.props.location}
        hendleLogout={this.hendleLogout}/>
    )
  }
}

NavigationContainer.propTypes = {
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps ({authentication, router}) {
  return {
    loggedIn: authentication.loggedIn,
    user: authentication.user,
    location: router.location,
  }
}

export default connect(
  mapStateToProps,
)(NavigationContainer)
