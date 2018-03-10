import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { checkIfAuthed } from './auth'
import { replace } from 'react-router-redux'

export default (BaseComponent, store) => {
  class Restricted extends Component {
    componentWillMount () {
      this.checkAuthentication(this.props)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication (props) {
      if (store.getState().users.isFetching === true) {
        return
      }

      const nextPathName = location.pathname
      const isAuthed = checkIfAuthed(store)
      if (nextPathName === '/' ||
          nextPathName === '/auth/login' ||
          nextPathName === '/auth/signUp' ||
          nextPathName === '/auth') {
        if (isAuthed === true) {
          store.dispatch(replace('/feed'))
        }
      } else {
        if (isAuthed !== true) {
          store.dispatch(replace('/auth'))
        }
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  return withRouter(Restricted)
}
