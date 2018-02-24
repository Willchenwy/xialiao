import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
// import {
//   newDuckTop, pointer, newDuckInputContainer,
//   newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#ebebeb',
    padding: 0,
  },
}

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired,
  duckFanout: PropTypes.func.isRequired,
}

export default function Modal (props) {
  function submitDuck () {
    props.duckFanout(formatDuck(props.duckText, props.user))
  }

  return (
    <span onClick={props.openModal}>
      Duck
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel='Modal'>
        <div>
          <span>Compose new Duck</span>
          <span onClick={props.closeModal}>X</span>
        </div>
        <div>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            placeholder="What's on your mind?" />
        </div>
        <button
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
          Duck
        </button>
      </ReactModal>
    </span>
  )
}
