import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

function SignUp ({handleSubmit, handleSignUp, signingUp}) {
  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <Form.Field>
        <Field
          name='displayName'
          component='input'
          type='text'
          placeholder='username'/>
      </Form.Field>
      <Form.Field>
        <Field
          name='email'
          component='input'
          type='text'
          placeholder='e-mail'/>
      </Form.Field>
      <Form.Field>
        <Field
          name='password'
          component='input'
          type='text'
          placeholder='password'/>
      </Form.Field>
      <Button
        loading = {signingUp === true}
        type='submit'>Sign Up</Button>
    </Form>
  )
}

SignUp.propTypes = {
  signingUp: PropTypes.any,
  handleSignUp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'signUp',
})(SignUp)
