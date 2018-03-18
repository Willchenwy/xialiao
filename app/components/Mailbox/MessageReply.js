import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Segment } from 'semantic-ui-react'

export default function MessageReply ({handleFormSubmit, handleSubmit}) {
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Field>
        <Field name='text' component='textarea' placeholder='Content'/>
      </Form.Field>
      <Segment clearing={true} basic={true} style={{padding: '5px'}}><Button
        primary={true}
        type='submit'
        floated='right'>Send</Button>
      </Segment>
    </Form>
  )
}

MessageReply.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
