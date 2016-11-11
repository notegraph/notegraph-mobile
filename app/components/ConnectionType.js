import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { AppStyles, Colors, Fonts } from '../themes'


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
        <View style={styles.container}>
          <Text>{type.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
})

export default ConnectionType
