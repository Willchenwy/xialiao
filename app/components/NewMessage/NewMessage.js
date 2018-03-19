import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, Button, Dropdown, Segment } from 'semantic-ui-react'

const DropdownFormField = ({
  input,
  isFetching,
  stateOptions,
  label,
  meta: { touched, error, warning },
}) => (
  <Form.Field>
    <Dropdown
      {...input}
      loading={isFetching}
      selection={true}
      selectOnNavigation={false}
      options={stateOptions}
      value={input.value}
      onChange={(param, data) => input.onChange(data.value)}
      placeholder={label}
      onSearchChange={input.onChange}
      search={true}
      searchQuery={input.value}/>
    {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
  </Form.Field>
)

const required = value => (value ? undefined : 'Required')
const RenderField = ({
  input,
  placeholder,
  meta: { touched, error, warning },
  TagName,
}) => (
  <div>
    <div>
      <TagName {...input} placeholder={placeholder} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

function NewMessage ({
  handleFormSubmit,
  handleSubmit,
  onSearchQueryChane,
  dropdownOptions,
  isFetching,
  pristine,
  submitting,
}) {
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Form.Field>
        <Field
          name='receiver'
          component={DropdownFormField}
          label='Receiver'
          onChange={(event, newValue, previousValue) => onSearchQueryChane(newValue)}
          stateOptions={pristine ? [] : dropdownOptions}
          isFetching={isFetching}
          validate={required}/>
      </Form.Field>
      <Form.Field>
        <Field
          name='subject'
          component={RenderField}
          placeholder='Subject'
          validate={required}
          TagName='input'/>
      </Form.Field>
      <Form.Field>
        <Field
          name='text'
          component={RenderField}
          placeholder='Content'
          validate={required}
          TagName='textarea'/>
      </Form.Field>
      <Segment clearing={true} basic={true} style={{padding: '5px'}}>
        <Button
          primary={true}
          type='submit'
          floated='right'
          disabled={submitting === true}>Send</Button>
      </Segment>
    </Form>
  )
}

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  TagName: PropTypes.string.isRequired,
}

DropdownFormField.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  stateOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

NewMessage.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSearchQueryChane: PropTypes.func.isRequired,
  dropdownOptions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'newMessage',
})(NewMessage)
