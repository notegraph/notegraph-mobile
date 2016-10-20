import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../themes/'

export default StyleSheet.create({
  navButtonText: {
    color: Colors.snow,
  },

  navButtonLeft: {
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.medium
  }

})
