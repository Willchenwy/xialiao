import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Grid, TextArea } from 'semantic-ui-react'

class Compose extends Component {
  render () {
    const { onSubmit, handleSubmit, onFocus } = this.props
    return (
      <Grid.Row>
        <Grid.Column width={12}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <Field
                name='text'
                component={() => (<TextArea onFocus={onFocus}/>)}/>
            </Form.Field>
            <div>
              <Button
                primary={true}
                type='submit'
                floated='right'>Send</Button>
            </div>
          </Form>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

Compose.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
}

export default Compose
