import React from 'react'
import {
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './styles/NavItemsStyle'
import { Actions as RouteActions, ActionConst } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors, Metrics } from '../themes'

// I18n
// import I18n from '../I18n/I18n.js'

const openDrawer = () => {
  RouteActions.refresh({
    key: 'drawer',
    open: true
  })
}

export default {

  backButton () {
    return (
      <TouchableOpacity onPress={RouteActions.pop}>
        <Icon name="arrow-back"
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  homeButton () {
    return (
      <TouchableOpacity onPress={() => RouteActions.dashboard({ type: ActionConst.RESET })}>
        <Icon name="home"
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  backAndHome () {
    return (
      <View style={styles.twoButtons}>
        {this.backButton()}
        {this.homeButton()}
      </View>
    )
  },

  saveNoteButton (handlePress) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name="check"
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  hamburgerButton () {
    return (
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu"
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  deleteNoteButton ({ noteId }, onPressFunction) {
    const handlePress = () => onPressFunction(noteId)
    return (
      <TouchableOpacity onPress={handlePress} >
        <Icon name="delete"
          size={Metrics.icons.medium}
          color={Colors.snow}
          style={[styles.navButtonRight]}
        />
      </TouchableOpacity>
    )
  },

}
