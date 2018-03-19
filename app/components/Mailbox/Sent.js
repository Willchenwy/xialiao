import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Accordion, Grid, Icon, Container } from 'semantic-ui-react'
import { LongLoading } from 'helpers/loading'

export default class Sent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render () {
    const {activeIndex} = this.state
    return (
      <Container style={{width: '1000px'}}>
        <Grid>
          <Grid.Column width={14}>
            {this.props.isFetchingSent === true
              ? <LongLoading />
              : <Accordion styled={true} fluid={true}>
                {this.props.sentMessageIds.map(
                  (id, idx) =>
                    <div key={id}>
                      <Accordion.Title active={activeIndex === idx} index={idx} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        {`Subject: ${this.props.messages[id].subject} To: ${this.props.messages[id].receiverName}`}
                      </Accordion.Title>
                      <Accordion.Content active={activeIndex === idx}>
                        <p>{this.props.messages[id].text}</p>
                      </Accordion.Content>
                    </div>
                )}
              </Accordion>}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
Sent.propTypes = {
  isFetchingSent: PropTypes.bool.isRequired,
  sentMessageIds: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
}
