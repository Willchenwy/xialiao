import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Image, Segment, Icon, Loader, Feed, Dimmer, Header } from 'semantic-ui-react'
import { ModalContainer } from 'containers'

const UnreadMessageList = ({messageIds, messages, isFetching, onRead}) => (
  isFetching === true
    ? <Segment>
      <Dimmer active={true} inverted={true}>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
      <Image src={require('../../assets/images/wireframe/paragraph.png')} />
    </Segment>
    : messageIds.length === 0
      ? <Segment basic={true}><Header as='h5' disabled={true} textAlign='center'>No new Messaeg</Header></Segment>
      : <Dropdown.Menu scrolling={true}>
        {messageIds.map(id =>
          <Dropdown.Item key={id}>
            <Feed as={Link} to={`/mailbox/inbox/${id}`} onClick={() => onRead(messages[id], messages[id].receiverId)}>
              <Feed.Event>
                <Feed.Label image={require('../../assets/images/avatar/small/christian.jpg')} />
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

const UsersMessage = ({messageIds, messages, isFetching, onRead}) => (
  <Dropdown icon={null} trigger={<Icon name='mail' size='large' link={true}/>}>
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

export default function Navigation (props) {
  return (
    props.loggedIn === true
      ? <Menu borderless={true}>
        <Menu.Item as={Link} to='/'>
          <Image
            size='mini'
            src={require('../../assets/images/crt425.png')}
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
            <Dropdown
              trigger={<span><Image src={require('../../assets/images/crt425.png')} avatar={true} />{`  ${props.user.name}`}</span>}
              icon={null}
              style={{ marginRight: '1.5em' }}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/'>My Account</Dropdown.Item>
                <Dropdown.Item as={Link} to='/'>Setting</Dropdown.Item>
                <Dropdown.Item onClick={props.hendleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  hendleLogout: PropTypes.func.isRequired,
  unreadDropdown: PropTypes.array.isRequired,
  messageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onRead: PropTypes.func.isRequired,
}
