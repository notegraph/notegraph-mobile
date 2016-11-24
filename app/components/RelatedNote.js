import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { Colors } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { onStartIcons, onEndIcons } from '../constants/relTypes'


function ConnectionIcon ({ con, onEnd }) {
  const mapping = onEnd ? onEndIcons : onStartIcons
  const iconName = mapping[con.type]

  if (iconName) {
    return (
      <Icon name={iconName}
        size={20}
        color={'black'}
        style={styles.relatedIcon}
      />
    )
  }
  return (
    <Text style={styles.conType}>{con.type.name || con.type}</Text>
  )
}
ConnectionIcon.propTypes = {
  con: PropTypes.object.isRequired,
  onEnd: PropTypes.bool.isRequired,
}


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
    const { note, con, noteOnEnd } = this.props

    // FIXME: remove type.name || type hack
    return (
      <TouchableOpacity
        onPress={this.handlePress}
        delayLongPress={2000}
        onLongPress={this.handleLongPress}
      >
        <ConnectionIcon con={con} onEnd={noteOnEnd} />
        <View style={styles.container}>
          {!!note.title && <Text style={styles.title}>{note.title}</Text>}
          <Text style={styles.note}>{note.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

RelatedNote.propTypes = {
  note: PropTypes.object.isRequired,
  con: PropTypes.object.isRequired,
  noteOnEnd: PropTypes.bool.isRequired,
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
  note: {
    padding: 5,
    paddingTop: 0,
  },
  container: {
    marginBottom: 15,
    backgroundColor: '#eee',
    maxHeight: 120,
  },

  relatedIcon: {
  }
})


export default RelatedNote
