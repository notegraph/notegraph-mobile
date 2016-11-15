import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { Colors } from '../themes'


class RelatedNote extends Component {
  handlePress = () => {
    const { note, onPress } = this.props
    onPress(note.id)
  }

  handleLongPress = () => {
    const { onLongPress, con } = this.props
    onLongPress(con.id)
  }


  render () {
    const { note, con } = this.props

    // FIXME: remove type.name || type hack
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        delayLongPress={3000}
        onLongPress={this.handleLongPress}
      >
        <View style={styles.container}>
          <Text style={styles.conType}>{con.type.name || con.type}</Text>
          {!!note.title && <Text style={styles.title}>{note.title}</Text>}
          <Text>{note.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

RelatedNote.propTypes = {
  note: PropTypes.object.isRequired,
  con: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  conType: {
    backgroundColor: Colors.blue,
    color: 'white',
    padding: 3,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  container: {
    marginBottom: 15,
  }
})


export default RelatedNote
