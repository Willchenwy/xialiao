import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Segment, Header, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { MessageSummaryContainer } from 'containers'
import { LongLoading } from '../../helpers/loading'

function Inbox (props) {
  const {isFetchingInbox, inboxMessageIds, match} = props
  return (
    isFetchingInbox === true
      ? <LongLoading />
      : <Grid>
        {inboxMessageIds.length === 0
          ? <Segment basic={true}><Header as='h5' disabled={true} textAlign='center'>No Messaeg</Header></Segment>
          : <Grid.Row>
            <Grid.Column width={5}>
              <Menu
                secondary={true}
                vertical={true}>
                {inboxMessageIds.map(
                  id =>
                    <Menu.Item
                      key={id}
                      as={NavLink}
                      to={`${match.url}/${id}`}
                      content={<MessageSummaryContainer messageId={id}/>}
                      style={{padding: '4px', maxheight: '65px'}}/>
                )}
              </Menu>
            </Grid.Column>
          </Grid.Row>}
      </Grid>
  )
}
Inbox.propTypes = {
  isFetchingInbox: PropTypes.bool.isRequired,
  inboxMessageIds: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
}

export default Inbox
