import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FriendsList } from 'components'
import { setAndHandleUsersListener } from 'redux/modules/users'

class FriendsListContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleUsersListener()
  }

  render () {
    return (
      <FriendsList
        uids={this.props.uids}
        users={this.props.users}
        authedUser={this.props.authedUser}
        isSettingLintener={this.props.isSettingLintener} />
    )
  }
}

FriendsListContainer.propTypes = {
  isSettingLintener: PropTypes.bool.isRequired,
  uids: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.object.isRequired,
  setAndHandleUsersListener: PropTypes.func.isRequired,
}

function mapStateToProps ({ users, authentication }) {
  return {
    isSettingLintener: users.isSettingLintener,
    authedUser: authentication.user,
    uids: users.uids,
    users: users,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({setAndHandleUsersListener}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsListContainer)
