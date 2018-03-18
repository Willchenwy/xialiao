import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Form, Button, Dropdown, Segment } from 'semantic-ui-react'

const DropdownFormField = props => (
  <Form.Field>
    <Dropdown
      loading={props.isFetching}
      selection={true}
      selectOnNavigation={false}
      {...props.input}
      options={props.stateOptions}
      value={props.input.value}
      onChange={(param, data) => props.input.onChange(data.value)}
      placeholder={props.label}
      onSearchChange={props.input.onChange}
      search={true}
      searchQuery={props.input.value}/>
  </Form.Field>
)

DropdownFormField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  stateOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default function NewMessage ({handleFormSubmit, handleSubmit, onSearchQueryChane, dropdownOptions, isFetching}) {
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Field>
        <Field
          name='receiver'
          component={DropdownFormField}
          label='Receiver'
          onChange={(event, newValue, previousValue) => onSearchQueryChane(newValue)}
          stateOptions={dropdownOptions}
          isFetching={isFetching}/>
      </Form.Field>
      <Form.Field>
        <Field name='subject' component='input' type='text' placeholder='Subject'/>
      </Form.Field>
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

NewMessage.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSearchQueryChane: PropTypes.func.isRequired,
  dropdownOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
