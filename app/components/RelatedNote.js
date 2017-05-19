import React, { PropTypes, Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { Colors, Fonts } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { onStartIcons, onEndIcons } from '../constants/relTypes'


function ConnectionIcon ({ con, onEnd, down }) {
  const mapping = onEnd ? onEndIcons : onStartIcons
  const iconName = mapping[con.type]

  const iconStyles = [styles.relatedIcon]
  if (down) iconStyles.push(styles.iconPointsDown)

  if (iconName) {
    return (
      <View style={styles.iconWrapper}>
        <Icon name={iconName}
          size={23}
          color={'black'}
          style={iconStyles}
        />
      </View>
    )
  }
  return (
    <Text style={styles.conType}>{con.type.name || con.type}</Text>
  )
}
ConnectionIcon.propTypes = {
  con: PropTypes.object.isRequired,
  onEnd: PropTypes.bool.isRequired,
  down: PropTypes.bool,
}


class RelatedNote extends Component {
  handlePress = () => {
    const { note, onPress } = this.props
    onPress(note.id)
  }

  handleLongPress = () => {
    const { onLongPress, con } = this.props
    if (onLongPress) onLongPress(con.id)
  }

  render () {
    const { note, con, noteOnEnd, conPosition } = this.props
    const noteStyles = [styles.noteContainer]
    if (con.type === 'owns' && (noteOnEnd || conPosition === 'bottom')) {
      noteStyles.push(styles.parentNote)
    }
    // console.log({note, con, noteOnEnd, conPosition})

    // FIXME: remove type.name || type hack
    return (
      <View style={styles.container}>
        <View style={styles.leftConHolder}>
          {conPosition === 'left' && <ConnectionIcon con={con} onEnd={noteOnEnd} />}
        </View>
        <View style={styles.noteWrapper}>
          <TouchableOpacity style={noteStyles}
            onPress={this.handlePress}
            delayLongPress={1500}
            onLongPress={this.handleLongPress}
          >
            <View >
              {!!note.title && <Text style={styles.title} numberOfLines={2}>{note.title}</Text>}
              <Text style={styles.note} numberOfLines={7}>{note.text}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomConHolder}>
            {conPosition === 'bottom' && <ConnectionIcon con={con} onEnd={noteOnEnd} down={true} />}
          </View>
        </View>
      </View>
    )
  }
}

RelatedNote.propTypes = {
  note: PropTypes.object.isRequired,
  con: PropTypes.object.isRequired,
  noteOnEnd: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
  conPosition: PropTypes.string,
}

RelatedNote.defaultProps = {
  conPosition: 'left',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  conType: {
    backgroundColor: Colors.blue,
    color: 'white',
    padding: 3,
    textAlign: 'center',
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    paddingLeft: 5,
    paddingRight: 5,
    color: Colors.noteTitle,
  },
  note: {
    padding: 5,
    paddingTop: 0,
    color: Colors.noteText,
  },
  leftConHolder: {
    marginLeft: -3,
    width: 23,
    marginBottom: 15,
    marginRight: 2,
  },
  bottomConHolder: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginTop: 1,
    marginBottom: 1,
    height: 23,
    alignItems: 'center',
  },
  noteWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  noteContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  // highlight parent notes
  parentNote: {
    borderWidth: 3,
  },

  iconWrapper: {
    top: -6,
    width: 22,
    height: 22,
    // borderRadius: 11,
    // borderColor: Colors.background,
    // borderWidth: 1,
  },
  relatedIcn: {
    right: -2,
  },
  iconPointsDown: {
    transform: [{rotate: '90deg'}],
    //
  }
})


export default RelatedNote
