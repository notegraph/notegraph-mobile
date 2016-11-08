import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { Colors } from '../themes'


const NoteItem = ({id, note, onOpenNote}) => {
  const handlePress = () => onOpenNote(id)
  const { text, title } = note

  return (
    <TouchableHighlight
      onPress={handlePress}
      style={[styles.note]}
      underlayColor={NOTE_TOUCH_COLOR}
    >
      <View >
        {!!title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  )
}


const NOTE_TOUCH_COLOR = '#eee'
const NOTES_MARGIN = 4

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
    maxHeight: 200,
    marginTop: NOTES_MARGIN,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',

  },
  title: {
    fontWeight: 'bold',
    color: Colors.noteTitle,
    paddingBottom: 4,
    fontSize: 17,
  },
  text: {
    color: Colors.noteText,
    fontSize: 15,
  },
})

export default NoteItem
