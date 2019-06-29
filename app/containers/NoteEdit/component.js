import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native'

// import InputScrollView from 'react-native-input-scroll-view'

import PropTypes from 'prop-types'

import R from 'ramda'


import { AppStyles, Colors, Fonts } from '../../themes'

import { Actions as RouteActions } from 'react-native-router-flux'


export class NoteEditView extends Component {
  static propTypes = {
    noteId: PropTypes.string,
    ownerNoteId: PropTypes.string,
    note: PropTypes.object.isRequired,
    saveNote: PropTypes.func.isRequired,
    isReadMode: PropTypes.bool.isRequired,
    isNew: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    const { note } = props

    this.state = {
      note
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
    const { note, isNew } = this.props
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <View style={styles.container}
        >
          <TextInput
            style={styles.title}
            defaultValue={note.title}
            onChangeText={this.onChangeTitle}
            placeholder={'Title'}
            autoFocus={isNew}
          />
          <TextInput
            style={[styles.text]}
            defaultValue={note.text}
            multiline
            onChangeText={this.onChangeText}
            placeholder={'Note'}
            autoFocus={!isNew}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: Colors.snow,
    flex: 1,
  },
  title: {
    color: Colors.noteText,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    margin: 0,
    padding: 0,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: Colors.noteText,
    margin: 0,
    padding: 0,

    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
  }

})



