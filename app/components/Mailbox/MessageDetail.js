import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import { MessageReplyContainer, ComposeContainer } from 'containers'
import { LongLoading } from '../../helpers/loading'

export default function MessageDetail ({message, isFetching, handleMessageReply}) {
  return (
    isFetching === true
      ? <LongLoading />
      : <Card raised={true} fluid={true}>
        <Card.Content>
          <Card.Meta textAlign='right'>3 days ago</Card.Meta>
          <Card.Header>{message.subject}</Card.Header>
          <Card.Meta>From {message.senderName} to me</Card.Meta>
          <Card.Description><pre style={{whiteSpace: 'pre-wrap', fontFamily: 'Lato'}}>{message.text}</pre></Card.Description>
        </Card.Content>
        <Card.Content extra={true}>
          <ComposeContainer
            handleFormSubmit={handleMessageReply}
            placeholder='Reply...'
            style={{marginTop: '40px'}}/>
        </Card.Content>
      </Card>
  )
}

MessageDetail.propTypes = {
  message: PropTypes.any,
  isFetching: PropTypes.bool.isRequired,
  handleMessageReply: PropTypes.func.isRequired,
}
