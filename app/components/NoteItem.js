import React, { PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Colors, Fonts } from '../themes'
import RippleTouchable from './RippleTouchable'

const NOTE_TOUCH_COLOR = '#ccc'
const NOTES_MARGIN = 4

const NoteItem = ({id, note, onOpenNote}) => {
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
      </View>
    </RippleTouchable>
  )
}



NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
  }),
  onOpenNote: PropTypes.func.isRequired,
}


const styles = StyleSheet.create({
  note: {
    minHeight: 30,
    marginTop: NOTES_MARGIN,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',

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
})

export default NoteItem
