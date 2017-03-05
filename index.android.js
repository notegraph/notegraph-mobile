import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import './raven'
import Root from './app/Root'

import configureStore from './app/store'



const store = configureStore()

const data = {
  notes: [],
  // activeNote
}

class NgKeep extends Component {
  render () {
    return (
      <Root data={data} store={store} />
    )
  }
}


AppRegistry.registerComponent('ngkeep', () => NgKeep)
