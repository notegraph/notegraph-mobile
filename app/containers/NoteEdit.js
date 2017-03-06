import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native'

import R from 'ramda'

import { connect } from 'react-redux'
import { AppStyles, Colors, Fonts } from '../themes'
import actions from '../actions/creators'
import { Actions as RouteActions } from 'react-native-router-flux'


const {height, width} = Dimensions.get('window')


const mapStateToProps = (state, ownProps) => {
  const { noteId } = ownProps
  const { notes, editor } = state
  return {
    note: noteId ? notes[noteId] : {},
    isReadMode: editor.isReadMode,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { ownerNoteId } = ownProps
  return {
    saveNote: note => dispatch(actions.saveNote(note, ownerNoteId)),
  }
}


class NoteEdit extends Component {
  static propTypes = {
    noteId: PropTypes.string,
    ownerNoteId: PropTypes.string,
    note: PropTypes.object.isRequired,
    saveNote: PropTypes.func.isRequired,
    isReadMode: PropTypes.bool.isRequired,
  }

  constructor (props) {
    super(props)
    const { note } = props

    this.state = {
      note,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { saveNote } = this.props
    if (nextProps.isReadMode && nextProps.isReadMode !== this.props.isReadMode) {
      if (this.state.isChanged) {
        saveNote(this.state.note)
      } else {
        RouteActions.pop()
      }
    }
  }

  onChangeTitle = (title) => {
    const { note } = this.state
    this.setState({
      note: R.merge(note, { title }),
      isChanged: true,
    }, () => {
      console.debug({ n: 'onChangeTitle', note: this.state.note })
    })
  }

  onChangeText = (text) => {
    const { note } = this.state
    this.setState({
      note: R.merge(note, { text }),
      isChanged: true,
    })
  }

  render () {
    const { note } = this.props

    return (
      <View style={[styles.mainContainer, styles.container]}>
        <TextInput
          style={styles.title}
          defaultValue={note.title}
          onChangeText={this.onChangeTitle}
          placeholder={'Title'}
        />

        <TextInput
          style={styles.text}
          defaultValue={note.text}
          multiline={true}
          onChangeText={this.onChangeText}
          placeholder={'Note'}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    padding: 10,
    paddingTop: 0,
  },
  title: {
    color: Colors.noteText,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: Colors.noteText,

    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  }

})



export default connect(mapStateToProps, mapDispatchToProps)(NoteEdit)
