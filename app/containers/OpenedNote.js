import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native'

import R from 'ramda'

import { connect } from 'react-redux'
import { AppStyles, Colors } from '../themes'
import actions from '../actions/creators'


const {height, width} = Dimensions.get('window')

class OpenedNote extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    saveNote: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    const { note } = props

    this.state = {
      note,
    }
  }

  componentWillUnmount() {
    const { saveNote } = this.props;
    if (this.state.isChanged) {
      saveNote(this.state.note)
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
    paddingTop: 20,
  },
  title: {
    color: Colors.noteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: Colors.noteText,
    fontSize: 17,
    // fontFamily: 'System',
    // height: height - 30,
  }

})

const mapStateToProps = (state) => {
  return {
    note: state.activeNote.opened || {},
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveNote: note => dispatch(actions.saveNote(note)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenedNote)
