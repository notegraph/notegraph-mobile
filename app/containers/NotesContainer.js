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


const NoteItem = ({id, text, onOpenNote}) => {
  const handlePress = () => onOpenNote(id)

  return (<TouchableHighlight onPress={handlePress}>
    <View style={[styles.note]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableHighlight>)
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onOpenNote: PropTypes.func.isRequired,
}


const notesColumn = (notes: string[], isEven: bool, props) => {
  return notes.map((note, i) => {
    if (isEven && (i % 2) === 1) return
    if (!isEven && (i % 2) === 0) return
    return <NoteItem key={i} id={note.id} text={note.text} {...props} />
  }
  )
}

const NotesContainer = ({ notes, onOpenNote }) => {
  const layoutWidth = Dimensions.get('window').width
  const columnStyle = StyleSheet.create({
    runtime: {
      width: layoutWidth / 2 - 15,
    }
  })

  return (
    <View style={styles.content}>
      <View style={columnStyle.runtime}>
        {notesColumn(notes, true, { onOpenNote })}
      </View>
      <View style={columnStyle.runtime}>
        {notesColumn(notes, false, { onOpenNote })}
      </View>
    </View>
  )
}


NotesContainer.propTypes = {
  notes: PropTypes.array.isRequired,
  onOpenNote: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  content: { // notes
    flex: 1,
    // fontSize: 20,
    // textAlign: 'center',
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  note: {
    minHeight: 30,
    maxHeight: 200,
    margin: 5,
    padding: 5,
    backgroundColor: '#fff',
  },
  text: {
    color: Colors.noteText,
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
