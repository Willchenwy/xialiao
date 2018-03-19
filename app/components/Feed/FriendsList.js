import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { avatars } from 'helpers/images'
import { Segment, Feed, Divider, Header } from 'semantic-ui-react'

function FriendsList ({uids, users, authedUser, isSettingLintener}) {
  return (
    <Segment
      raised={true}
      style={{minHeight: '500px'}}
      loading={isSettingLintener}>
      <Header as='h4'>FRIENDS</Header>
      <Divider fitted={true} />
      <Feed>
        {uids.map(
          id => (
            id !== authedUser.uid &&
          <Feed.Event key={id} as={Link} to={`/user/${id}`}>
            <Feed.Label image={avatars[users[id].info.avatar]} />
            <Feed.Content>
              <Feed.Summary>{`  ${users[id].info.name}`}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
          )
        )}
      </Feed>
    </Segment>
  )
}

FriendsList.propTypes = {
  isSettingLintener: PropTypes.bool.isRequired,
  uids: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.object.isRequired,
}

export default FriendsList
