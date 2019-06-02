import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Colors, Fonts } from '../themes'
import RippleTouchable from './RippleTouchable'

const NOTE_TOUCH_COLOR = '#ccc'
const NOTES_MARGIN = 4


const RelsCounter = ({ count }) => {
  const text = (count >= 10) ? '9+' : count

  return (
    <View style={styles.relsCounter}>
      <Text style={styles.relsCounterText}>{text}</Text>
    </View>
  )
}

RelsCounter.propTypes = {
  count: PropTypes.number,
}


const NoteItem = ({id, note, relsCount, onOpenNote}) => {
  const handlePress = () => onOpenNote(id)
  const { text, title } = note

  return (
    <RippleTouchable
      onPress={handlePress}
      color={NOTE_TOUCH_COLOR}
    >
      <View style={[styles.note]}>
        {!!title && <Text style={styles.title} numberOfLines={2}>{title}</Text>}
        <Text style={styles.text} numberOfLines={10}>{text}</Text>
        {relsCount !== 0 && <RelsCounter count={relsCount} />}
      </View>

    </RippleTouchable>
  )
}



NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  // note: PropTypes.shape({
  //   text: PropTypes.string.isRequired,
  //   title: PropTypes.string,
  // }),
  relsCount: PropTypes.number,
  onOpenNote: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
  note: {
    minHeight: 30,
    marginTop: NOTES_MARGIN,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.border,

  },
  title: {
    fontFamily: Fonts.type.bold,
    color: Colors.noteTitle,
    paddingBottom: 4,
    fontSize: Fonts.size.regular,
  },
  text: {
    fontFamily: Fonts.type.base,
    color: Colors.noteText,
    fontSize: Fonts.size.medium,
  },

  relsCounter: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,

    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: 'flex-end',
  },
  relsCounterText: {
    color: Colors.noteTitle,
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  }
})

export default NoteItem
