import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Button, Grid } from 'semantic-ui-react'

class SignUp extends Component {
  render () {
    const {handleSubmit, handleFormSubmit, isSigning} = this.props
    return (
      <Grid.Column style={{marginLeft: '68px'}}>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
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
            loading = {isSigning}
            type='submit'>Sign Up</Button>
        </Form>
      </Grid.Column>
    )
  }
}

SignUp.propTypes = {
  isSigning: PropTypes.bool.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const ReduxForm = reduxForm({
  form: 'signUp',
})(SignUp)

export default connect()(ReduxForm)
