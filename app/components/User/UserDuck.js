import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'

const UserDuck = ({duckIds}) => (
  <div>
    {duckIds.map((id) => (
      <DuckContainer
        duckId={id}
        key={id} />
    ))}
  </div>
)

UserDuck.propTypes = {
  duckIds: PropTypes.array.isRequired,
}

export default UserDuck
