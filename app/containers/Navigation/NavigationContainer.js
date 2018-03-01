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
        alarmOptions={alarmOptions}/>
    )
  }
}

NavigationContainer.propTypes = {
  user: PropTypes.any,
  isAuthed: PropTypes.bool.isRequired,
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.isAuthed,
    user: users[users.authedId],
  }
}

export default connect(
  mapStateToProps,
  null,
)(NavigationContainer)
