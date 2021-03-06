import React from 'react'
import { paragraph } from 'helpers/images'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export function LongLoading () {
  return (
    <Segment style={{marginTop: '40px'}}>
      <Dimmer active={true} inverted={true}>
        <Loader size='large'>Loading</Loader>
      </Dimmer>
      <Image src={paragraph} />
    </Segment>
  )
}
