import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Duck } from 'components'
import * as usersLikesActions from 'redux/modules/usersLikes'
import { store } from '../../index'
import { push } from 'react-router-redux'

class DuckContainer extends Component {

  goToDuckDetail = () => (
    store.dispatch(push(this.props.duck.uid))
  )

  render () {
    return (
      <Duck {...this.props} />
    )
  }
}

DuckContainer.propTypes = {
  duck: PropTypes.object.isRequired,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

function mapStateToProps ({ ducks, likeCount, usersLikes, router }, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
    pathname: router.location.pathname,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckContainer)
