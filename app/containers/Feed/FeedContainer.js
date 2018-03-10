import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Feed } from 'components'
import { Grid, Header } from 'semantic-ui-react'
import ComposeContainer from '../Compose/ComposeContainer'
import * as feedActionCreators from 'redux/modules/feed'
import { duckFanout } from '../../redux/modules/ducks'
import { formatDuck } from '../../helpers/utils'
import { reset } from 'redux-form'

class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }

  handleFormSubmit = ({text}) => {
    this.props.duckFanout(formatDuck(text, this.props.user))
      .then(this.props.reset('compose'))
  }

  render () {
    return (
      <Grid>
        <ComposeContainer
          handleFormSubmit={this.handleFormSubmit}
          placeholder='Compose new Duck...'
          style={{marginTop: '40px'}}>
          <Header as='h2'>What's happening?</Header>
        </ComposeContainer>
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
  duckFanout: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

function mapStateToProps ({ feed, users }) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
    user: users[users.authedId] ? users[users.authedId].info : {},
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...feedActionCreators, duckFanout, reset}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer)
