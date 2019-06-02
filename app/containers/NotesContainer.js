import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'

import PropTypes from 'prop-types';

import R from 'ramda'
import { connect } from 'react-redux'
import actions from '../actions/creators'
import { Colors } from '../themes'
import NoteItem from '../components/NoteItem'
import { selectActiveGroupItems } from '../selectors/noteSelectors'

const mapStateToProps = (state, props) => {
  return {
    items: selectActiveGroupItems(state, props)
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
    const { note, relsCount } = elem

    if (isEven && (i % 2) === 1) return
    if (!isEven && (i % 2) === 0) return

    if (!note) {
      console.warn(`orphan record, no note found, i=${i}`)
      return
    }

    return <NoteItem key={i} id={note.id} note={note} relsCount={relsCount} {...props} />
  })
}

const NotesContainer = ({ items, onOpenNote }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollable}>
          <View style={[styles.column, styles.columnLeft]}>
            {notesColumn(items, true, { onOpenNote })}
          </View>
          <View style={[styles.column, styles.columnRight]}>
            {notesColumn(items, false, { onOpenNote })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}


NotesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  onOpenNote: PropTypes.func,
}

// const NOTES_MARGIN = 4

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
  },
  scrollable: { // notes
    flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    margin: 1,
  },

  columnLeft: {
    marginLeft: 2,
    // marginRight: 1,
  },
  columnRight: {
    marginRight: 2,
  },

})


export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
