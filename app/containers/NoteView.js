/* @flow weak */
import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { connect } from 'react-redux'
import { AppStyles, Colors, Metrics } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions as RouteActions } from 'react-native-router-flux'


import actions from '../actions/creators'

import { findRelatedNotes } from '../reducers/queries'
import RelatedNote from '../components/RelatedNote'

import ButtonsGroup from '../components/ButtonsGroup'


const mapStateToProps = (state, ownProps) => {
  const { noteId } = ownProps
  const { editor, notes } = state
  const note = notes[noteId] || {}
  const { groupId } = editor

  const related = findRelatedNotes(state, groupId, note.id)
  return {
    note,
    related,
    groupId,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { noteId } = ownProps
  return {
    editNote: () => dispatch(actions.openNote(noteId, false)),
    viewNote: (id) => dispatch(actions.openNote(id, true)),
    addRelation: (id) => RouteActions.newRelation({ noteId }),
    deleteRelation: (groupId, relId) => dispatch(actions.deleteRelation(groupId, relId)),
    addChildNote: () => {
      dispatch(actions.newNote())
      RouteActions.noteEdit({ ownerNoteId: noteId })
    }
  }
}


class NoteView extends Component {
  static propTypes = {
    noteId: PropTypes.string.isRequired,
    note: PropTypes.object.isRequired,
    groupId: PropTypes.string.isRequired,
    related: PropTypes.arrayOf(
      PropTypes.shape({
        con: PropTypes.object.isRequired,
        note: PropTypes.object.isRequired,
        noteOnEnd: PropTypes.bool.isRequired,
      })
    ).isRequired,
    editNote: PropTypes.func.isRequired,
    viewNote: PropTypes.func.isRequired,
    addRelation: PropTypes.func.isRequired,
    deleteRelation: PropTypes.func.isRequired,
    addChildNote: PropTypes.func.isRequired,
  }

  editCurrentNote = () => {
    const { editNote } = this.props
    editNote()
  }

  showDeleteConfirm = (relId) => {
    const { deleteRelation, groupId } = this.props

    Alert.alert(
      'Remove connection',
      'Are you sure?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => deleteRelation(groupId, relId) },
      ]
    )
  }

  renderRelated () {
    const { viewNote } = this.props

    return this.props.related.map(r => (
      <RelatedNote
        key={`${r.note.id}-${r.con.type}`}
        {...r}
        onPress={viewNote}
        onLongPress={this.showDeleteConfirm}
      />)
    )
  }

  renderButtons () {
    const { addRelation, addChildNote } = this.props
    const buttons = [
      {
        title: 'Add Relation',
        onPress: addRelation,
      },
      {
        title: 'Add Note',
        onPress: addChildNote,
      },
    ]

    return (
      <ButtonsGroup buttons={buttons} />
    )
  }

  render () {
    const { note, related } = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.scrollview}>
          <View style={[styles.container]}>
            <View style={styles.noteContainer}>
              <View style={styles.titleCont}>
                <Text style={styles.title}>{note.title}</Text>
                <TouchableOpacity onPress={this.editCurrentNote}>
                  <Icon name="mode-edit"
                    size={Metrics.icons.medium}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{note.text}</Text>
            </View>

            { !!related.length && (
              <View style={styles.relatedContainer}>
                {this.renderRelated()}
              </View>
              )
            }
          </View>
        </ScrollView>
        {this.renderButtons()}
      </View>
    )
  }
}

const Spacer = () => <View style={styles.spacer} />


const styles = StyleSheet.create({
  ...AppStyles.screen,
  scrollview: {
    // flex: 1,
  },
  container: {
    padding: 10,
    paddingTop: 65,
    flex: 1,
    flexDirection: 'row',

  },
  noteContainer: {
    flex: 3,
  },
  relatedContainer: {
    flex: 2,
    marginLeft: 5,
  },
  titleCont: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    color: Colors.noteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: Colors.noteText,
    fontSize: 17,
  },
})



export default connect(mapStateToProps, mapDispatchToProps)(NoteView)
