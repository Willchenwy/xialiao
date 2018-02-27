import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default function FacebookAuthButton ({ onAuth, isFetching }) {
  return (
    <Button onClick={(e) => onAuth(e, 'FACEBOOK_AUTH')} color='facebook' style={{ margin: '1.5em' }}>
      <Icon name='facebook' />
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </Button>
  )
}
