import React from 'react'
import PropTypes from 'prop-types'
import { FacebookAuthButton, GoogleAuthButton } from 'components'
import { Grid, Image } from 'semantic-ui-react'

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
    <div className='login-form'>
      <style>{`
    body > div,
    body > div > div,
    body > div > div > div.container,
    body > div > div > div.container > div.login-form {
      height: 100%;
    }
  `}</style>
      <Grid textAlign='center'
        style={{ height: '85%' }}
        verticalAlign='middle'>
        <Grid.Column textAlign='center'>
          <Image src={require('../../assets/images/crt425.png')} style={{maxWidth: 200}} centered={true}/>
          {facebookAuthentication &&
        <FacebookAuthButton
          isFetching={isFetching}
          onAuth={onAuth} />}
          {googleAuthentication &&
        <GoogleAuthButton
          isFetching={isFetching}
          onAuth={onAuth} />}
          {error && <p>{error}</p>}
        </Grid.Column>
      </Grid>
    </div>
  )
}
