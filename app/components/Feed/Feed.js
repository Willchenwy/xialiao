import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'
import { Grid, Loader, Message } from 'semantic-ui-react'
import ListExampleAnimated from './FriendsList'

function NewDucksAvailable ({ handleClick }) {
  return (
    <Message onClick={handleClick} color='blue'>
      New Ducks Available
    </Message>
  )
}

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

Feed.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

export default function Feed (props) {
  return props.isFetching === true
    ? <Loader active={true} inline='centered' />
    : <Grid.Row>
      <Grid.Column width={12}>
        {props.newDucksAvailable &&
                    <NewDucksAvailable handleClick={props.resetNewDucksAvailable} />}
        {props.duckIds.length === 0 &&
                    <p>This is unfortunate. <br /> It appears there are no ducks yet.</p>}
        {props.duckIds.map((id) => (
          <DuckContainer
            duckId={id}
            key={id} />
        ))}
        {props.error && <p>{props.error}</p>}
      </Grid.Column>
      <Grid.Column width={4}>
        <ListExampleAnimated />
      </Grid.Column>
    </Grid.Row>
}
