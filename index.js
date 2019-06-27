import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/Root'


if (!__DEV__) {
  require('./raven')
}


const data = {
  notes: [],
  // activeNote
}

class NgKeep extends Component {
  render () {
    return (
      <Root data={data} />
    )
  }
}


AppRegistry.registerComponent('ngkeep', () => NgKeep)
