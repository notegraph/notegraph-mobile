import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import './raven'
import Root from './app/Root'

// const RootX = () => (<View><Text>Fukc off</Text></View>);

const data = {
  notes: []
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
