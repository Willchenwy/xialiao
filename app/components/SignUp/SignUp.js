import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import { signUpValidate as validate } from 'helpers/formValidator'

const RenderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

function SignUp (props) {
  const {handleSubmit, handleSignUp, signingUp, error, submitting} = props
  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <Form.Field>
        <Field
          name='displayName'
          component={RenderField}
          type='text'
          placeholder='username'/>
      </Form.Field>
      <Form.Field>
        <Field
          name='email'
          component={RenderField}
          type='text'
          placeholder='e-mail'/>
      </Form.Field>
      <Form.Field>
        <Field
          name='password'
          component={RenderField}
          type='password'
          placeholder='password'/>
      </Form.Field>
      {error && <strong>{error}</strong>}
      <Button
        disabled={submitting === true}
        loading={signingUp === true}
        type='submit'>Sign Up</Button>
    </Form>
  )
}

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

SignUp.propTypes = {
  signingUp: PropTypes.any,
  handleSignUp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
}

export default reduxForm({
  form: 'signUp',
  validate,
})(SignUp)
