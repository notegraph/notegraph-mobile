import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'


class RelatedNote extends Component {
  _onPress = () => {
    const { note, viewNote } = this.props
    viewNote(note.id)
  }

  render () {
    const { note, con } = this.props

    // FIXME: remove type.name || type hack
    return (
      <TouchableOpacity
        onPress={this._onPress}
      >
        <View>
          <Text style={styles.conType}>{con.type.name || con.type}</Text>
          {!!note.title && <Text>{note.title}</Text>}
          <Text>{note.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

RelatedNote.propTypes = {
  note: PropTypes.object.isRequired,
  con: PropTypes.object.isRequired,
  viewNote: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  conType: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 3,
    textAlign: 'center',
  }
})


export default RelatedNote
