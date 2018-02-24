import React from 'react'
import PropTypes from 'prop-types'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'

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
    <div
      style={{cursor: cursorValue}}
      onClick={props.onClick}>
      <img src={props.duck.avatar}/>
      <div>
        <div>
          <div onClick={props.goToProfile}>{props.duck.name}</div>
          <div>{formatTimestamp(props.duck.timestamp)}</div>
        </div>
        <div>{props.duck.text}</div>
        <div>
          {!props.hideReplyBtn &&
            <Reply/>}
          <div>
            <Star
              onClick={(e) => starFn(props.duck.duckId, e)} />
            {!props.hideLikeCount &&
              <div>{props.numberOfLikes}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
