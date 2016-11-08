import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { AppStyles, Colors, Metrics } from '../themes'


class ConnectionType extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  _onSelect = () => {
    const { onSelect, type } = this.props
    onSelect(type)
  }

  render () {
    const { type } = this.props
    return (
      <TouchableOpacity onPress={this._onSelect}>
        <Text>{type.name}</Text>
      </TouchableOpacity>
    )
  }
}


export default ConnectionType
