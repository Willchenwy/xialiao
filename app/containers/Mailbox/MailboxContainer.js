import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { InboxContainer, SentContainer } from 'containers'
import { fetchAndHandleInbox } from 'redux/modules/inbox'
import { fetchAndHandleSent } from 'redux/modules/sent'
import { Mailbox } from 'components'

class MailboxContainer extends Component {
  componentDidMount () {
    this.props.fetchAndHandleInbox()
    this.props.fetchAndHandleSent()
  }

  render () {
    const {match} = this.props
    return (
      <div>
        <Mailbox match={match}/>
        <Switch>
          <Route path={`${match.path}/inbox`} component={InboxContainer} />
          <Route path={`${match.path}/sent`} component={SentContainer} />
          <Redirect exact={true} from={`${match.path}`} to={`${match.url}/inbox`}/>
          <Redirect to={`${match.url}/inbox`}/>
        </Switch>
      </div >
    )
  }
}

MailboxContainer.propTypes = {
  fetchAndHandleInbox: PropTypes.func.isRequired,
  fetchAndHandleSent: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({fetchAndHandleInbox, fetchAndHandleSent}, dispatch)
}

export default connect(
  null,
  mapDispatchToProps,
)(MailboxContainer)
