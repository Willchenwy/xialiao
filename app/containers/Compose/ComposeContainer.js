import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { duckFanout } from '../../redux/modules/ducks'
import { formatDuck } from '../../helpers/utils'
import { Form, Button, Grid, TextArea, Header } from 'semantic-ui-react'

const inputBox = (field) => {
  return (
    <TextArea
      {...field.input}
      rows={field.input.value === '' ? 1 : 3}
      style={{resize: 'none'}}
      placeholder='Compose new Duck'/>
  )
}

class ComposeContainer extends Component {
  handleFormSubmit = ({text}) => {
    const {duckFanout, user, reset} = this.props
    duckFanout(formatDuck(text, user))
    reset()
  }
  render () {
    const {handleSubmit, pristine} = this.props
    return (
      <Grid.Row style={{paddingTop: '40px'}}>
        <Grid.Column width={12}>
          <Header as='h2'>What's happing?</Header>
          <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Form.Field>
              <Field
                name='text'
                component={inputBox}/>
            </Form.Field>
            <div>
              {pristine
                ? null
                : <Button
                  primary={true}
                  type='submit'
                  floated='right'>Send</Button>}
            </div>
          </Form>
        </Grid.Column>
      </Grid.Row>
    )
  }
}

const mapStateToProps = ({ users }) => {
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    duckFanout,
  }, dispatch)
}

const ReduxForm = reduxForm({
  form: 'compose',
})(ComposeContainer)

ComposeContainer.propTypes = {
  user: PropTypes.any.isRequired,
  duckFanout: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxForm)
