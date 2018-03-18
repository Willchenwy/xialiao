import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatTimestamp } from 'helpers/utils'
import { Comment, Grid, Segment, Loader, Image, Dimmer } from 'semantic-ui-react'
import { shortParagraph, avatars } from 'helpers/images'

function Reply ({ comment }) {
  return (
    <Comment>
      <Comment.Avatar src={avatars[comment.avatar]} />
      <Comment.Content>
        <Comment.Author as={Link} to={`${comment.uid}`}>{comment.name}</Comment.Author>
        <Comment.Metadata>
          <div>{formatTimestamp(comment.timestamp)}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.reply}</Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object,
}

export default function Replies ({ isFetching, error, replies }) {
  const replyIds = Object.keys(replies)

  return (
    <Grid.Row style={{marginTop: '20px'}}>
      {error &&
        <p>{error}</p>}
      {isFetching === true
        ? <Segment>
          <Dimmer active={true} inverted={true}>
            <Loader size='small'>Loading</Loader>
          </Dimmer>
          <Image src={shortParagraph} />
        </Segment>
        : <Grid.Column width={16}>
          <Comment.Group>
            {replyIds.map((replyId) => (<Reply key={replyId} comment={replies[replyId]} />))}
          </Comment.Group>
        </Grid.Column>}
      {replyIds.length === 0 &&
          <h3>Be the first to comment.</h3>}
    </Grid.Row>
  )
}
