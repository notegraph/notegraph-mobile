import React, { Component, PropTypes } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import { Colors, Metrics } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'

function ActionButton ({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="add-circle"
        size={Metrics.icons.button}
        style={styles.button}
      />
    </TouchableOpacity>
  )
}

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    color: Colors.blue,
  }
})


export default ActionButton
