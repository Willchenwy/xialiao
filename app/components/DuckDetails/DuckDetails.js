import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { DuckContainer, RepliesContainer, ComposeContainer } from 'containers'
import { Feed, Divider, Grid, Header, Container } from 'semantic-ui-react'
import { avatars } from 'helpers/images'
import { LongLoading } from 'helpers/loading'

export default function DuckDetails (props) {
  const { isFetching, handleFormSubmit, error } = props
  return (
    <Container text={true} style={{marginTop: '40px'}}>
      <Grid>
        <Grid.Row>
          {isFetching === true
            ? <LongLoading />
            : error !== ''
              ? <p>{error}</p>
              : <Grid.Column width={16}>
                <Feed>
                  <Feed.Event>
                    <Feed.Label as={Link} to={`/user/${props.duck.uid}`} image={avatars[props.duck.avatar]} />
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
                <Divider section={true} hidden={true}/>
                <Header as='h3' dividing={true}>Comments</Header>
                <ComposeContainer
                  handleFormSubmit={handleFormSubmit}
                  placeholder='Add a public comment...'
                  style={{marginTop: '20px'}}/>
                <Divider section={true} hidden={true}/>
                <RepliesContainer duckId={props.duck.duckId} />
              </Grid.Column>}
        </Grid.Row>
      </Grid>
    </Container>
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
