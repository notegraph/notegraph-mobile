import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'


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
          {!!note.title && <Text style={styles.title}>{note.title}</Text>}
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    // maxHeight: 40,
    // overflow: 'hidden',
    maxHeight: 90,
  },
  separator: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  title: {
    fontWeight: 'bold'
  }
})

export default FoundNote
