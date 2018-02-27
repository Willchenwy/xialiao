import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react'

Navigation.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  user: PropTypes.any,
}

const Navi = ({user}) => (
  <Menu borderless={true}>
    <Menu.Item as={Link} to='/'>
      <Image size='mini' src={require('../../assets/images/crt425.png')} style={{ marginRight: '1.5em', marginLeft: '1.5em' }}/>
      <span style={{color: 'black', fontSize: 'large'}}>Xialiao</span>
    </Menu.Item>
    <Menu.Item as={Link} to='/' icon={true} position='right'>
      <Icon size='large' name='mail' />
    </Menu.Item>
    <Menu.Item as={Link} to='/' icon={true}>
      <Icon size='large' name='alarm' />
    </Menu.Item>
    <Dropdown pointing='top' text={user.name} className='link item' style={{ marginRight: '1.5em' }}>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to='/'>My Account</Dropdown.Item>
        <Dropdown.Item as={Link} to='/'>Setting</Dropdown.Item>
        <Dropdown.Item as={Link} to='/logout'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
)

const Login = () => (
  <Menu borderless={true}>
    <Menu.Item as={Link} to='/' position='left'>
      Home
    </Menu.Item>
    <Menu.Item as={Link} to='/login' position='right'>
      Login
    </Menu.Item>
    <Menu.Item as={Link} to='/'>
      Sing up
    </Menu.Item>
  </Menu>
)

export default function Navigation ({ isAuthed, user }) {
  return (
    isAuthed === true
      ? <Navi user={user.info}/>
      : <Login />
  )
}
