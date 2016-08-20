import React, { Component } from 'react'
import { AppRegistry, Text, View } from 'react-native'

import Root from './App/Root'

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
