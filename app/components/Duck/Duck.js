import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from 'helpers/utils'
import { Segment, Feed, Icon } from 'semantic-ui-react'

Duck.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired,
}

export default function Duck (props) {
  const starFn = props.isLiked === true ? props.handleDeleteLike : props.addAndHandleLike
  const cursorValue = props.hideReplyBtn === true ? 'default' : 'pointer'
  return (
    <Segment raised={true}>
      <div
        style={{cursor: cursorValue}}
        onClick={props.hideReplyBtn ? null : props.onClick}>
        <Feed>
          <Feed.Event>
            {props.hideReplyBtn ? null : <Feed.Label image={props.duck.avatar} />}
            <Feed.Content>
              {props.hideReplyBtn
                ? null
                : <Feed.Summary>
                  <a onClick={props.goToProfile}>{props.duck.name}</a>
                  <Feed.Date>{formatTimestamp(props.duck.timestamp)}</Feed.Date>
                </Feed.Summary>}
              <Feed.Extra text={true}>
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
      </div>
    </Segment>
  )
}
