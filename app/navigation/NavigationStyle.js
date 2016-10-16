import { StyleSheet } from 'react-native'
import { Metrics } from '../themes'

export default StyleSheet.create({
  navigationBar: {
    backgroundColor: 'orange',
    height: Metrics.navBarHeight
  },

  navButtonLeft: {
    marginTop: -3,
    marginLeft: 10,
  },
  navButtonRight: {
    marginTop: -3,
    marginRight: 10,
  }
})

