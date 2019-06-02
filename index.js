import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/Root'
import configureStore from './app/store'


if (!__DEV__) {
  require('./raven')
}


const { store, persistor } = configureStore()

const data = {
  notes: [],
  // activeNote
}

class NgKeep extends Component {
  render () {
    return (
      <Root data={data} store={store} persistor={persistor} />
    )
  }
}


AppRegistry.registerComponent('ngkeep', () => NgKeep)