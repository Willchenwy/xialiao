import React from 'react'
import PropTypes from 'prop-types'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default function FacebookAuthButton ({ onAuth, isFetching }) {
  return (
    <button onClick={(e) => onAuth(e, 'FACEBOOK_AUTH')}>
      {isFetching === true
        ? 'Loading'
        : 'Login with facebook'}
    </button>
  )
}
