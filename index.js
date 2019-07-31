import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Root from './app/Root'
import {name as appName} from './app.json'

if (!__DEV__) {
  require('./raven')
}


const data = {
  notes: [],
  // activeNote
}

class App extends Component {
  render () {
    return (
      <Root data={data} />
    )
  }
}


AppRegistry.registerComponent(appName, () => App)
