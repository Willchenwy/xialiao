import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Image, List, Divider } from 'semantic-ui-react'

function FriendsList ({uids, users, isSettingLintener}) {
  return (
    <List selection={true} verticalAlign='middle' floated='left'>
      <List.Item>
        <List.Header style={{paddingBottom: '15px'}}>FRIENDS</List.Header>
        <Divider fitted={true} />
      </List.Item>
      {uids.map(
        id => (
          <List.Item key={id} as={Link} to={`/user/${id}`}>
            <Image avatar={true} src={require('../../assets/images/avatar/small/helen.jpg')} />
            <List.Content>
              <List.Header>{`  ${users[id].info.name}`}</List.Header>
            </List.Content>
          </List.Item>
        )
      )}
    </List>
  )
}

FriendsList.propTypes = {
  isSettingLintener: PropTypes.bool.isRequired,
  uids: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
}

export default FriendsList
