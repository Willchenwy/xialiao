import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

function Login ({handleSubmit, handleLogin, loggingIn}) {
  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
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
        loading = {loggingIn === true}
        type='submit'>Login</Button>
    </Form>
  )
}

Login.propTypes = {
  loggingIn: PropTypes.any,
  handleLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'loginIn',
})(Login)
