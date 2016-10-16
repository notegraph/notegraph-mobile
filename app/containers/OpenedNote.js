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

  // render() {
  //   // <NavBar leftButton={this.cancelButton} rightButton={this.postButton}/>
  //   return (
  //     <ScrollView keyboardDismissMode='interactive' style={styles.container}>
  //       <TextInput multiline={true}
  //         onChangeText={(text) => {
  //           this.state.note.text = text;
  //         }}
  //         defaultValue={this.state.note.text}
  //         autoFocus={true}
  //         style={[styles.text]}
  //       />
  //     </ScrollView>
  //   );
  // }

  onChangeText = (text) => {
    const { note } = this.state
    note.text = text;

    this.setState({
      note: R.evolve({ text: () => text})(note),
      isChanged: true,
    }, () => {
      // console.debug({ n: 'onChangeText', note: this.state.note, text })
    })

  }

  render () {
    const { note } = this.props

    return (
      <View style={[styles.mainContainer, styles.container]}>
        <TextInput
          style={styles.text}
          defaultValue={note.text}
          multiline={true}
          onChangeText={this.onChangeText}
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
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    color: Colors.noteText,
    fontSize: 15,
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
