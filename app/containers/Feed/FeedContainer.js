import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Feed } from 'components'
import { Grid } from 'semantic-ui-react'
import ComposeContainer from '../Compose/ComposeContainer'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Grid>
        <ComposeContainer />
        <Feed
          duckIds={this.props.duckIds}
          newDucksAvailable={this.props.newDucksAvailable}
          error={this.props.error}
          isFetching={this.props.isFetching}
          resetNewDucksAvailable={this.props.resetNewDucksAvailable}/>
      </Grid>
    )
  }
}

FeedContainer.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

function mapStateToProps ({ feed }) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)
