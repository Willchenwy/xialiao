import React from 'react'
import PropTypes from 'prop-types'
// import {
//   mainContainer, container, content, repliesContainer,
//   replyTextAreaContainer, replyTextArea } from './styles.css'
// import { subHeader, darkBtn, errorMsg } from 'shared/styles.css'
import { DuckContainer, RepliesContainer } from 'containers'
import { formatReply } from 'helpers/utils'

function Reply ({ submit }) {
  function handleSubmit (e) {
    if (Reply.ref.value.length === 0) {
      return
    }

    submit(Reply.ref.value, e)
    Reply.ref.value = ''
  }

  return (
    <div>
      <textarea
        ref={(ref) => Reply.ref = ref}
        maxLength={140}
        placeholder='Your response'
        type='text' />
      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

DuckDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

export default function DuckDetails ({ duckId, isFetching, authedUser, error, addAndHandleReply }) {
  return (
    <div>
      {isFetching === true
        ? <p>Loading</p>
        : <div>
          <div>
            <DuckContainer duckId={duckId} hideLikeCount={false} hideReplyBtn={true} />
            <Reply submit={(replyText) => addAndHandleReply(
              duckId,
              formatReply(authedUser, replyText)) } />
          </div>
          <div>
            <RepliesContainer duckId={duckId} />
          </div>
        </div>}
      {error &&
          <p>{error}</p>}
    </div>
  )
}
