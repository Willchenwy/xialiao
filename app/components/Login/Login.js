import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Button, Grid } from 'semantic-ui-react'
import { FacebookAuthButton, GoogleAuthButton } from 'components'

function Login (props) {
  const {handleSubmit, handleEmailAndPasswordLogin, handleGoogleAndFacebookLogin, isFetching} = props
  const facebookAuthentication = false
  const googleAuthentication = false
  return (
    <Grid.Column style={{marginLeft: '68px'}}>
      <Form onSubmit={handleSubmit(handleEmailAndPasswordLogin)}>
        <Form.Field>
          <Field
            name='email'
            component='input'
            type='text'
            placeholder='email'/>
        </Form.Field>
        <Form.Field>
          <Field
            name='password'
            component='input'
            type='text'
            placeholder='password'/>
        </Form.Field>
        <Button
          loading = {isFetching}
          type='submit'>Login!!</Button>
      </Form>
      {facebookAuthentication &&
        <FacebookAuthButton
          isFetching={isFetching}
          onAuth={handleGoogleAndFacebookLogin} />}
      {googleAuthentication &&
        <GoogleAuthButton
          isFetching={isFetching}
          onAuth={handleGoogleAndFacebookLogin} />}
    </Grid.Column>
  )
}

Login.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  handleGoogleAndFacebookLogin: PropTypes.func.isRequired,
  handleEmailAndPasswordLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const ReduxForm = reduxForm({
  form: 'loginIn',
})(Login)

export default connect()(ReduxForm)
