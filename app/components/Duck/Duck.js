import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { avatars } from 'helpers/images'
import { formatTimestamp } from 'helpers/utils'
import { Segment, Feed, Icon } from 'semantic-ui-react'

export default function Duck (props) {
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
  return (
    <Segment raised={true} style={{minHeight: '100px'}}>
      <Feed>
        <Feed.Event>
          {!props.hideReplyBtn && <Feed.Label image={avatars[props.duck.avatar]} />}
          <Feed.Content>
            {!props.hideReplyBtn &&
                <Feed.Summary>
                  <Feed.User as={Link} to={`/user/${props.duck.uid}`}>
                    {props.duck.name}
                  </Feed.User>
                  <Feed.Date>{formatTimestamp(props.duck.timestamp)}</Feed.Date>
                </Feed.Summary>}
            <Feed.Extra text={true} as={Link} to={`/duckDetail/${props.duck.duckId}`}>
              {props.duck.text}
            </Feed.Extra>
            <Feed.Meta style={{float: 'right'}}>
              {!props.hideReplyBtn && <Icon name='reply' />}
              <Feed.Like>
                <Icon
                  name='favorite'
                  color={props.isLiked === true ? 'yellow' : 'grey'}
                  onClick={(e) => starFn(props.duck.duckId, e)} />
                {!props.hideLikeCount && <span>{props.numberOfLikes}</span>}
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment>
  )
}
Duck.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
}
