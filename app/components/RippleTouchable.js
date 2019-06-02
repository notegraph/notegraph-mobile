import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableNativeFeedback
} from 'react-native'


const RippleTouchable = ({ color, children, onPress }) => {
  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple(color, false)}
    >
      {children}
    </TouchableNativeFeedback>
  )
}

RippleTouchable.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
}


export default RippleTouchable
