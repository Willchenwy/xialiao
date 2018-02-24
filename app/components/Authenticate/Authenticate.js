import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton, GoogleAuthButton } from 'components'

Authenticate.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
}

export default function Authenticate ({ isFetching, error, onAuth }) {
  // Control what auth methods are available
  const facebookAuthentication = true
  const googleAuthentication = false

  return (
    <div>
      <h1>Authenticate</h1>
      {facebookAuthentication &&
        <FacebookAuthButton
          isFetching={isFetching}
          onAuth={onAuth} />}
      {googleAuthentication &&
        <GoogleAuthButton
          isFetching={isFetching}
          onAuth={onAuth} />}
      {error && <p>{error}</p>}
    </div>
  )
}
