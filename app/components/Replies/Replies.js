import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from 'helpers/utils'

function Reply ({ comment }) {
  return (
    <div>
      <img src={comment.avatar} alt={comment.name} />
      <div>
        <div>{comment.name}</div>
        <div>{formatTimestamp(comment.timestamp)}</div>
        <div>{comment.reply}</div>
      </div>
    </div>
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
    <div>
      {error &&
        <p>{error}</p>}
      {isFetching === true
        ? <p>Fetching Replies</p>
        : <div>
          <h1>Replies</h1>
          {replyIds.map((replyId) => (<Reply key={replyId} comment={replies[replyId]} />))}
        </div>}
      {replyIds.length === 0 &&
          <h3>Be the first to comment.</h3>}
    </div>
  )
}
