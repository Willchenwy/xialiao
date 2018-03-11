import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DuckContainer, RepliesContainer, ComposeContainer } from 'containers'
import { Feed, Segment, Grid, Loader, Header, Dimmer, Image } from 'semantic-ui-react'

export default function DuckDetails (props) {
  const { isFetching, handleFormSubmit, error } = props
  return (
    <Grid.Row style={{marginTop: '40px'}}>
      {isFetching === true
        ? <Segment>
          <Dimmer active={true} inverted={true}>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          <Image src={require('../../assets/images/wireframe/paragraph.png')} />
        </Segment>
        : <Grid.Column width={16}>
          <Feed>
            <Feed.Event>
              <Feed.Label as={Link} to={`/user/${props.duck.uid}`} image={props.duck.avatar} />
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User as={Link} to={`/user/${props.duck.uid}`}>{props.duck.name} </Feed.User>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Date>posted 3 days ago</Feed.Date>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          <DuckContainer duckId={props.duck.duckId} hideLikeCount={false} hideReplyBtn={true} />
          <Header as='h3' dividing={true}>Comments</Header>
          <ComposeContainer
            handleFormSubmit={handleFormSubmit}
            placeholder='Add a public comment...'
            style={{marginTop: '20px'}}/>
          <RepliesContainer duckId={props.duck.duckId} />
        </Grid.Column>}
      {error &&
          <p>{error}</p>}
    </Grid.Row>
  )
}

DuckDetails.propTypes = {
  duck: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    duckId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
  }),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
}
