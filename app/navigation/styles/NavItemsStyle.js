import {StyleSheet} from 'react-native'
import { Metrics, Colors } from '../../themes/'


const buttonCommon = {
  fontSize: 24,
}

export default StyleSheet.create({
  navButtonText: {
    color: Colors.snow,
  },

  navButtonLeft: {
    ...buttonCommon,
    marginLeft: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    width: Metrics.icons.medium
  },

  navButtonRight: {
    ...buttonCommon,
  },

  twoButtons: {
    flex: 1,
    flexDirection: 'row',
  }

})
