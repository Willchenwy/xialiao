import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image, Segment, Icon, Loader, Feed, Dimmer, Header, Label } from 'semantic-ui-react'
import { ModalContainer } from 'containers'
import { logoPath, paragraph, avatars } from 'helpers/images'

function UnreadMessageList ({messageIds, messages, isFetching, onRead}) {
  return (
    isFetching === true
      ? <Segment>
        <Dimmer active={true} inverted={true}>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
        <Image src={paragraph} />
      </Segment>
      : messageIds.length === 0
        ? <Segment basic={true}><Header as='h5' disabled={true} textAlign='center'>No Unread Messaeg</Header></Segment>
        : <Dropdown.Menu scrolling={true}>
          {messageIds.map(id =>
            <Dropdown.Item key={id}>
              <Feed as={Link} to={`/mailbox/inbox/${id}`} onClick={() => onRead(messages[id])}>
                <Feed.Event>
                  <Feed.Label image={avatars[messages[id].senderAvatar]} />
                  <Feed.Content>
                    <Feed.Summary>
                      {messages[id].senderName}
                    </Feed.Summary>
                    <Feed.Extra>
                      {messages[id].text.length < 40
                        ? messages[id].text
                        : `${messages[id].text.substring(0, 40)}...`}
                    </Feed.Extra>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Dropdown.Item>)}
        </Dropdown.Menu>
  )
}

function UsersMessage ({messageIds, messages, isFetching, onRead}) {
  return (
    <Dropdown
      icon={null}
      trigger={
        <div>
          <Icon name='mail' size='large' link={true}/>
          {messageIds.length > 0 &&
            <Label circular={true} color='red' empty={true}
              corner={true} size='mini'/>}
        </div>}>
      <Dropdown.Menu style={{minWidth: '350px'}}>
        <Dropdown.Header className='center'>My Message</Dropdown.Header>
        <UnreadMessageList messageIds={messageIds} messages={messages} isFetching={isFetching} onRead={onRead}/>
        <Dropdown.Divider />
        <ModalContainer />
        <Dropdown.Item as={Link} to={'/mailbox'}>
          <Icon name='mail'/>All Message
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

function UsersAccount ({authedUser, hendleLogout}) {
  return (
    <Dropdown
      icon={null}
      trigger={
        <span>
          <Image src={avatars[authedUser.avatar]} avatar={true} />
        </span>}
      style={{ marginRight: '1.5em' }}>
      <Dropdown.Menu style={{minWidth: '250px'}}>
        <Dropdown.Item>
          <Feed as={Link} to={`/user/${authedUser.uid}`}>
            <Feed.Event>
              <Feed.Label image={avatars[authedUser.avatar]} />
              <Feed.Content>
                <Feed.Summary>
                  {authedUser.name}
                </Feed.Summary>
                <Feed.Meta>{authedUser.email}</Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Dropdown.Item>
        <Dropdown.Divider />
        {/* <Dropdown.Item as={Link} to='/'>My Account</Dropdown.Item>
        <Dropdown.Item as={Link} to='/'>Setting</Dropdown.Item> */}
        <Dropdown.Item onClick={hendleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default function Navigation (props) {
  return (
    props.loggedIn === true
      ? <Menu borderless={true}>
        <Menu.Item as={Link} to='/'>
          <Image
            size='mini'
            src={logoPath}
            style={{ marginRight: '1.5em', marginLeft: '1.5em' }} />
          <span style={{color: 'black', fontSize: 'large'}}>Xialiao</span>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <UsersMessage
              messageIds={props.messageIds}
              messages={props.messages}
              isFetching={props.isFetching}
              onRead={props.onRead} />
          </Menu.Item>
          <Menu.Item>
            <UsersAccount
              authedUser={props.authedUser}
              hendleLogout={props.hendleLogout}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      : <Menu borderless={true}>
        <Menu.Item as={Link} to='/' position='left'>
          Home
        </Menu.Item>
        {props.location.pathname === '/' &&
        <Menu.Item as={Link} to='/auth/login'>
          Login
        </Menu.Item>}
        {props.location.pathname === '/' &&
        <Menu.Item as={Link} to='/auth/signUp'>
          Sign Up
        </Menu.Item>}
      </Menu>
  )
}

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  authedUser: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  hendleLogout: PropTypes.func.isRequired,
  unreadDropdown: PropTypes.array.isRequired,
  messageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onRead: PropTypes.func.isRequired,
}
