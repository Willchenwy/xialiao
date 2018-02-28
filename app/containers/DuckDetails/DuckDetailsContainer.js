import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { DuckDetails } from 'components'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'
import { formatReply } from 'helpers/utils'
import {reset} from 'redux-form'

class DuckDetailsContainer extends Component {
  componentDidMount () {
    this.props.initLikeFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }

  handleFormSubmit = ({text}) => {
    this.props.addAndHandleReply(
      this.props.duckId,
      formatReply(this.props.authedUser, text))
      .then(this.props.reset('compose'))
  }

  render () {
    return (
      <Grid>
        <DuckDetails
          duck={this.props.ducks[this.props.duckId]}
          isFetching={this.props.isFetching}
          error={this.props.error}
          handleFormSubmit={this.handleFormSubmit} />
      </Grid>
    )
  }
}

DuckDetailsContainer.propTypes = {
  ducks: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  authedUser: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  initLikeFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

function mapStateToProps ({ ducks, likeCount, users }, props) {
  const duckId = props.match.params.duckId
  return {
    ducks,
    duckId,
    authedUser: users[users.authedId].info,
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    duckAlreadyFetched: !!ducks[duckId],
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
    reset,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DuckDetailsContainer)
