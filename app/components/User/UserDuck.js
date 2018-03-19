import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'
import { Grid } from 'semantic-ui-react'

const UserDuck = ({duckIds}) => (
  <Grid.Row>
    <Grid.Column width={12}>
      {duckIds.map((id) => (
        <DuckContainer
          duckId={id}
          key={id} />
      ))}
    </Grid.Column>
  </Grid.Row>
)

UserDuck.propTypes = {
  duckIds: PropTypes.array.isRequired,
}

export default UserDuck
