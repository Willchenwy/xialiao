import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer, ComposeContainer, FriendsListContainer } from 'containers'
import { Container, Grid, Loader, Message, Segment, Dimmer, Image, Header } from 'semantic-ui-react'
import {paragraph} from 'helpers/images'

function NewDucksAvailable ({handleClick}) {
  return (
    <Message onClick={handleClick} color='blue'>
      New Ducks Available
    </Message>
  )
}

export default function Feed (props) {
  const {duckIds, isFetching, handleduckFanout, resetNewDucksAvailable, newDucksAvailable} = props
  return (
    <Container text={true}>
      {isFetching === true
        ? <Segment>
          <Dimmer active={true} inverted={true}>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          <Image src={paragraph} />
        </Segment>
        : <Grid>
          <Grid.Row>
            <Grid.Column width={12} floated='right'>
              <ComposeContainer
                handleFormSubmit={handleduckFanout}
                placeholder='Compose new Duck...'
                style={{marginTop: '40px'}}>
                <Header as='h2'>{`What's happening?`}</Header>
              </ComposeContainer>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4} textAlign='left'>
              <FriendsListContainer />
            </Grid.Column>
            <Grid.Column width={12}>
              {newDucksAvailable && <NewDucksAvailable handleClick={resetNewDucksAvailable} />}
              {duckIds.length === 0 && <p>This is unfortunate. <br /> It appears there are no ducks yet.</p>}
              {duckIds.map(
                id => (
                  <DuckContainer duckId={id} key={id} />
                ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>}
    </Container>
  )
}

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

Feed.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  handleduckFanout: PropTypes.func.isRequired,
}
