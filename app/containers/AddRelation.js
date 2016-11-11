/* @flow weak */

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native'

import R from 'ramda'

import { connect } from 'react-redux'
import { AppStyles, Fonts } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions as RouteActions } from 'react-native-router-flux'

import actions from '../actions/creators'
import FoundNote from '../components/FoundNote'
import ConnectionType from '../components/ConnectionType'

// import { findRelatedNotes } from '../reducers/queries'


const connectionTypes = [
  { id: 'defines', name: 'Defines' },
  { id: 'related', name: 'Related' },
  { id: 'custom', name: 'Custom Relationship', isCustom: true },
]


const mapStateToProps = (state) => {
  const { editor, notes } = state
  const items = R.path(['groups', editor.groupId, 'items'])(state)

  const matchedNotes = R.compose(
    R.reject(R.propEq('id', editor.note.id)),
    R.map(i => notes[i.id])
  )(items)

  return {
    groupId: editor.groupId,
    curNote: editor.note,
    matchedNotes,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveRelation: (groupId: string, curNoteId: string, selNoteId: string, conType: ConType) => {
      const rel = {
        from: curNoteId,
        to: selNoteId,
        type: conType.id,
      }
      dispatch(actions.saveRelation(groupId, rel))
      RouteActions.pop()
    }
  }
}

class AddRelation extends Component {
  static propTypes = {
    groupId: PropTypes.string.isRequired,
    curNote: PropTypes.object.isRequired,
    matchedNotes: PropTypes.arrayOf(PropTypes.any).isRequired,
    saveRelation: PropTypes.func.isRequired,
    // editNote: PropTypes.func.isRequired,
    // viewNote: PropTypes.func.isRequired,
    // saveNote: PropTypes.func.isRequired,
  }

  state: {
    selectedNote?: any,
  }

  constructor (props) {
    super(props)

    this.state = {
      // selectedNote: null,
    }
  }


  onResultPress = (note) => {
    this.setState({
      selectedNote: note,
    })
  }

  renderResults () {
    const { matchedNotes } = this.props
    return matchedNotes.map((note, index) =>
      <FoundNote
        key={note.id}
        note={note}
        index={index}
        onSelect={this.onResultPress}
      />
    )
  }

  renderNoteSearch () {
    return (
      <View>
        <TextInput placeholder="Search" />

        <Text>Select note</Text>
        {this.renderResults()}
      </View>
    )
  }

  onConnectionTypePress = (conType: ConType) => {
    const { curNote, groupId, saveRelation } = this.props
    const selNote = this.state.selectedNote
    if (!selNote) return

    saveRelation(groupId, curNote.id, selNote.id, conType)
  }

  renderRelationSelect () {
    return (
      <View>
        <Text style={styles.header}>Select Connection Type</Text>
        {connectionTypes.map(t => (
          <ConnectionType
            key={t.id}
            type={t}
            onSelect={this.onConnectionTypePress}
          />)
        )}
      </View>
    )
  }

  render () {
    const { selectedNote } = this.state

    return (
      <View style={styles.container}>
        {!selectedNote ? this.renderNoteSearch() : this.renderRelationSelect() }
      </View>
    )
  }
}


// const REL_WIDTH = (width - PADDING_H * 2) / 2

const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    padding: 10,
    paddingTop: 50,
    flex: 1,
    // flexDirection: 'row',

  },

  header: {
    fontSize: Fonts.size.h3,
    // color: 'red',
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(AddRelation)


// flow types

type ConType = {
  id: string, name: string,
}
