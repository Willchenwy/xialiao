import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NewMessageContainer } from '../../containers'
import { Button, Icon, Modal } from 'semantic-ui-react'
import * as modalActionCreators from 'redux/modules/modal'

const modalStyles = {
  width: '40%',
  height: '40%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -50%)`,
}

const modalHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

class ModalContainer extends Component {
  render () {
    const {openModal, closeModal, isOpen} = this.props
    return (
      <Modal
        trigger={<Button onClick={openModal}>Show Modal</Button>}
        open={isOpen}
        onClose={closeModal}
        style={modalStyles}>
        <Icon name='close' onClick={closeModal} />
        <Modal.Header className='modalHeader'>
          New Message
        </Modal.Header>
        <Modal.Content>
          <NewMessageContainer />
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps ({ modal }) {
  return {
    isOpen: modal.isOpen,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(modalActionCreators, dispatch)
}

ModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContainer)
