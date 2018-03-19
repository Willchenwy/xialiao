import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid } from 'semantic-ui-react'
import { ComposeContainer } from 'containers'
import { LongLoading } from '../../helpers/loading'

export default function MessageDetail ({message, isFetching, handleMessageReply, error}) {
  return (
    <Grid.Column width={12}>
      {isFetching === true
        ? <LongLoading />
        : error !== ''
          ? <p>error</p>
          : <Card raised={true} fluid={true} style={{minHeight: '600px'}}>
            <Card.Content style={{padding: '30px'}}>
              <Card.Meta textAlign='right'>3 days ago</Card.Meta>
              <Card.Header>{message.subject}</Card.Header>
              <Card.Meta>From {message.senderName} to me</Card.Meta>
              <Card.Description>
                <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Lato'}}>{message.text}</pre>
              </Card.Description>
            </Card.Content>
            <Card.Content extra={true}>
              <ComposeContainer
                handleFormSubmit={handleMessageReply}
                placeholder='Reply...'
                style={{marginTop: '40px'}}/>
            </Card.Content>
          </Card>}
    </Grid.Column>
  )
}

MessageDetail.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  handleMessageReply: PropTypes.func.isRequired,
}
