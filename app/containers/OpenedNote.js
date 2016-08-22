import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'
import { AppStyles, Colors } from '../themes'


class OpenedNote extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
  }

  render () {
    const { note } = this.props

    return (
      <View style={[styles.mainContainer, styles.container]}>
        <Text style={styles.text}>{note.text}</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    padding: 10,
  },
  text: {
    color: Colors.noteText,
    fontSize: 15,
  }

})

const mapStateToProps = (state) => {
  return {
    note: state.activeNote.opened || {},
  }
}

export default connect(mapStateToProps)(OpenedNote)
