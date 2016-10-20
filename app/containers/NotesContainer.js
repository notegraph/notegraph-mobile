import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,

} from 'react-native'

import { connect } from 'react-redux'
import actions from '../actions/creators'
import { Colors } from '../themes'


const NoteItem = ({id, note, onOpenNote}) => {
  const handlePress = () => onOpenNote(id)
  const { text, title } = note;

  return (
  <TouchableHighlight
    onPress={handlePress}
    style={[styles.note]}
    underlayColor={NOTE_TOUCH_COLOR}
  >
    <View >
      {title && <Text style={styles.title}>{title}</Text>}
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableHighlight>)
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    title: PropTypes.string,
  }),
  onOpenNote: PropTypes.func.isRequired,
}


const notesColumn = (notes: string[], isEven: bool, props) => {
  return notes.map((note, i) => {
    if (isEven && (i % 2) === 1) return
    if (!isEven && (i % 2) === 0) return
    return <NoteItem key={i} id={note.id} note={note} {...props} />
  }
  )
}

const NotesContainer = ({ notes, onOpenNote }) => {
  const layoutWidth = Dimensions.get('window').width
  const columnStyle = StyleSheet.create({
    runtime: {
      width: layoutWidth / 2 - NOTES_MARGIN * 2 + 1,
    }
  })

  return (
    <View style={styles.content}>
      <View style={[styles.columnLeft, columnStyle.runtime]}>
        {notesColumn(notes, true, { onOpenNote })}
      </View>
      <View style={[styles.columnRight, columnStyle.runtime]}>
        {notesColumn(notes, false, { onOpenNote })}
      </View>
    </View>
  )
}


NotesContainer.propTypes = {
  notes: PropTypes.array.isRequired,
  onOpenNote: PropTypes.func.isRequired,
}

const NOTES_MARGIN = 4;
const NOTE_TOUCH_COLOR = '#eee';

const styles = StyleSheet.create({
  content: { // notes
    flex: 1,
    // fontSize: 20,
    // textAlign: 'center',
    paddingTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  note: {
    minHeight: 30,
    maxHeight: 200,
    marginTop: NOTES_MARGIN,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',

  },
  columnLeft: {
    margin: 0,
    marginLeft: NOTES_MARGIN,
    marginRight: NOTES_MARGIN / 2,
  },
  columnRight: {
    margin: 0,
    marginLeft: NOTES_MARGIN / 2,
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
  }
})


const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNote: (id) => {
      ownProps.navToNote(id)
      dispatch(actions.openNote(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
