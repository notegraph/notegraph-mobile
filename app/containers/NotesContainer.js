import React, { PropTypes } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

import R from 'ramda'
import { connect } from 'react-redux'
import actions from '../actions/creators'
import { Colors } from '../themes'
import NoteItem from '../components/NoteItem'


const mapStateToProps = (state) => {
  const { groupId } = state.editor

  const group = R.path(['groups', groupId], state) || {}
  const items = group.items || []
  return {
    items: items.map(
      item => ({ item, note: state.notes[item.id] })
    ),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNote: (id) => {
      dispatch(actions.openNote(id, true))
    }
  }
}



const notesColumn = (items: any[], isEven: bool, props) => {
  return items.map((elem, i) => {
    const { note } = elem

    if (isEven && (i % 2) === 1) return
    if (!isEven && (i % 2) === 0) return

    if (!note) {
      console.warn(`orphan record, no note found, i=${i}`)
      return
    }

    return <NoteItem key={i} id={note.id} note={note} {...props} />
  })
}

const NotesContainer = ({ items, onOpenNote }) => {
  const layoutWidth = Dimensions.get('window').width
  const columnStyle = StyleSheet.create({
    runtime: {
      width: layoutWidth / 2 - NOTES_MARGIN * 2 + 1,
    }
  })

  return (
    <View style={styles.content}>
      <View style={[styles.columnLeft, columnStyle.runtime]}>
        {notesColumn(items, true, { onOpenNote })}
      </View>
      <View style={[styles.columnRight, columnStyle.runtime]}>
        {notesColumn(items, false, { onOpenNote })}
      </View>
    </View>
  )
}


NotesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  onOpenNote: PropTypes.func,
}

const NOTES_MARGIN = 4

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

  columnLeft: {
    margin: 0,
    marginLeft: NOTES_MARGIN,
    marginRight: NOTES_MARGIN / 2,
  },
  columnRight: {
    margin: 0,
    marginLeft: NOTES_MARGIN / 2,
  },

})


export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
