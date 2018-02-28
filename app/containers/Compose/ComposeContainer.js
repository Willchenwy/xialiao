import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Form, Button, Grid, TextArea, Divider, Segment } from 'semantic-ui-react'

const inputBox = (field) => {
  return (
    <TextArea
      {...field.input}
      rows={field.input.value === '' ? 1 : 3}
      style={{resize: 'none'}}
      placeholder={field.placeholder}/>
  )
}

class ComposeContainer extends Component {
  render () {
    const {handleSubmit, pristine, handleFormSubmit, placeholder, style} = this.props
    return (
      <Grid.Row style={style}>
        <Grid.Column width={12}>
          {this.props.children}
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Form.Field>
              <Field
                name='text'
                component={inputBox}
                placeholder={placeholder}/>
            </Form.Field>
            {pristine
              ? null
              : <Segment clearing={true} basic={true} style={{padding: '5px'}}><Button
                primary={true}
                type='submit'
                floated='right'>Send</Button>
              </Segment>}
            {pristine ? null : <Divider clearing={true}/>}
          </Form>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

const ReduxForm = reduxForm({
  form: 'compose',
})(ComposeContainer)

ComposeContainer.propTypes = {
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
}

export default connect()(ReduxForm)
