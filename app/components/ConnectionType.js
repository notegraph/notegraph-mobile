import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
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

          <View style={styles.iconWrapper}>
            <Icon name={type.icon}
              size={30}
              color={'black'}
              style={styles.relatedIcon}
            />
          </View>

          <Text style={styles.name}>{type.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  name: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h6,
    color: Colors.noteTitle,
  }

})

export default ConnectionType
