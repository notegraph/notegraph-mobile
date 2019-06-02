import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { Colors, Fonts } from '../themes'


class FoundNote extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    index: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
  }

  _onPress = () => {
    const { onSelect, note } = this.props
    onSelect(note)
  }

  render () {
    const { note, index } = this.props

    // TODO: find better solution trim long text
    const text = note.text && note.text.substring(0, 100) || ''
    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
        <View style={styles.container}>
          {!!index && <View style={styles.separator}></View>}
          {!!note.title && <Text style={styles.title} numberOfLines={1}>{note.title}</Text>}
          <Text style={styles.text} numberOfLines={5}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.snow,
    padding: 5,
  },
  separator: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    color: Colors.noteText,
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.noteText,
  }
})

export default FoundNote
