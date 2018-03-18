import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sent } from 'components'

export default class SentContainer extends Component {
  render () {
    return (
      <h1>Sent</h1>
      // <Sent
      //   isFetchingSent={this.props.isFetchingSent}
      //   sentMessageIds={this.props.sentMessageIds}
      //   messages={this.props.messages}/>
    )
  }
}

// SentContainer.propTypes = {
//   isFetchingSent: PropTypes.bool.isRequired,
//   sentMessageIds: PropTypes.array.isRequired,
//   messages: PropTypes.object.isRequired,
//   match: PropTypes.object.isRequired,
// }

// function mapStateToProps ({sent, messages}) {
//   return {
//     messages: messages,
//     isFetchingInbox: sent.isFetching,
//     inboxMessageIds: sent.messageIds,
//   }
// }

// export default connect(
//   mapStateToProps
// )(SentContainer)
