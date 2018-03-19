import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Sent } from 'components'

class SentContainer extends Component {
  render () {
    console.log()
    return (
      <Sent
        isFetchingSent={this.props.isFetchingSent}
        sentMessageIds={this.props.sentMessageIds}
        messages={this.props.messages}/>
    )
  }
}

SentContainer.propTypes = {
  isFetchingSent: PropTypes.bool.isRequired,
  sentMessageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

function mapStateToProps ({sent, messages}) {
  return {
    messages: messages,
    isFetchingSent: sent.isFetching,
    sentMessageIds: sent.messageIds,
  }
}

export default connect(
  mapStateToProps
)(SentContainer)
