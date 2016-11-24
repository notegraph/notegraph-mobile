import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  MKButton,
} from 'react-native-material-kit'


import { Colors, Metrics } from '../themes'

const ActionButton = ({onPress, children}) => {
  return (
    <MKButton
      shadowRadius={2}
      shadowOffset={{width: 0, height: 2}}
      shadowOpacity={0.7}
      shadowColor="black"
      onPress={onPress}
    >
      <Icon name="add-circle"
        size={Metrics.icons.button}
        style={styles.button}
      />
    </MKButton>
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
