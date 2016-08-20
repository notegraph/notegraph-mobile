import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'
import { AppStyles } from '../themes'


class OpenedNote extends Component {
  propTypes = {
    note: PropTypes.object.isRequired,
  }

  render () {
    const { note } = this.props

    return (
      <View style={styles.mainContainer}>
        <Text>{note.text}</Text>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
  }
})

const mapStateToProps = (state) => {
  return {
    note: state.activeNote.opened,
  }
}

export default connect(mapStateToProps)(OpenedNote)
