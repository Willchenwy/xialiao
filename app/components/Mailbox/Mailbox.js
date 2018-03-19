import React from 'react'
import PropTypes from 'prop-types'
import { Container, Menu, Divider } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default function Mailbox ({match}) {
  return (
    <Container style={{width: '1000px', marginTop: '40px'}}>
      <Menu pointing={true} secondary={true}>
        <Menu.Item
          name='Inbox'
          as={NavLink}
          to={`${match.url}/inbox`} />
        <Menu.Item
          name='Sent'
          as={NavLink}
          to={`${match.url}/sent`}/>
      </Menu>
      <Divider hidden={true}/>
    </Container>
  )
}

Mailbox.propTypes = {
  match: PropTypes.object.isRequired,
}
