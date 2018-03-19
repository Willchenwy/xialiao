import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import { loginValidate as validate } from 'helpers/formValidator'

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

function Login (props) {
  const {
    handleSubmit,
    handleLogin,
    loggingIn,
    error,
    submitting,
  } = props

  return (
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Form.Field>
        <Field
          name='email'
          component={RenderField}
          type='text'
          placeholder='email'/>
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
        loading={loggingIn === true}
        type='submit'>Login</Button>
    </Form>
  )
}

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

Login.propTypes = {
  loggingIn: PropTypes.any,
  handleLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
}

export default reduxForm({
  form: 'loginIn',
  validate,
})(Login)
