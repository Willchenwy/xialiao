import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'

const mailOptions = [
  { key: 'mail', text: 'No mail' },
]

const alarmOptions = [
  { key: 'notification', text: 'No notification' },
]

class NavigationContainer extends Component {
  render () {
    return (
      <Navigation
        isAuthed={this.props.isAuthed}
        user={this.props.user}
        mailOptions={mailOptions}
        alarmOptions={alarmOptions}
        location={this.props.location}/>
    )
  }
}

NavigationContainer.propTypes = {
  user: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
}

function mapStateToProps ({users, router}) {
  return {
    isAuthed: users.isAuthed,
    user: users[users.authedId],
    location: router.location,
  }
}

export default connect(
  mapStateToProps,
  null,
)(NavigationContainer)
