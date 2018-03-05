import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'

NewMessage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default function NewMessage ({onSubmit, handleSubmit}) {
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} style={{paddingTop: '30px'}}>
        <Form.Group unstackable={true} widths={2}>
          <Form.Field>
            <label htmlFor='receiver'>Receiver</label>
            <Field name='receiver' component='input' type='text' />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label htmlFor='subject'>Subject</label>
          <Field name='subject' component='input' type='text' />
        </Form.Field>
        <Form.Field>
          <label htmlFor='text'>Text</label>
          <Field name='text' component='textarea'/>
        </Form.Field>
        <div style={{paddingTop: '20px'}}>
          <Button primary={true} type='submit' floated='right'>Send</Button>
        </div>
      </Form>
    </div>
  )
}
