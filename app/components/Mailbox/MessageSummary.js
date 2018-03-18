import React from 'react'
import PropTypes from 'prop-types'
import { avatars } from 'helpers/images'
import { Feed } from 'semantic-ui-react'

export default function MessageSummary ({message, textColor}) {
  return (
    <Feed>
      <Feed.Event>
        <Feed.Label image={avatars[message.senderAvatar]} />
        <Feed.Content>
          <Feed.Summary style={{color: textColor}}>{message.senderName}</Feed.Summary>
          <Feed.Extra style={{color: textColor}}>
            {message.text.length < 15
              ? message.text
              : `${message.text.substring(0, 15)}...`}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

MessageSummary.propTypes = {
  textColor: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
}
