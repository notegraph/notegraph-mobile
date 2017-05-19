import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native'
import Menu, { MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu'

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

  backButton (isWhite = false) {
    return (
      <TouchableOpacity onPress={RouteActions.pop}>
        <Icon name="arrow-back"
          size={Metrics.icons.medium}
          color={!isWhite ? Colors.iconDark : Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  homeButton (isWhite = false) {
    return (
      <TouchableOpacity onPress={() => RouteActions.dashboard({ type: ActionConst.RESET })}>
        <Icon name="home"
          size={Metrics.icons.medium}
          color={!isWhite ? Colors.iconDark : Colors.snow}
          style={styles.navButtonLeft}
        />
      </TouchableOpacity>
    )
  },

  openSearch () {
    return (
      <TouchableOpacity onPress={() => RouteActions.search()}>
        <Icon name="search"
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
          color={Colors.iconDark}
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
          color={Colors.iconDark}
          style={[styles.navButtonRight]}
        />
      </TouchableOpacity>
    )
  },

  noteMenu ({ noteId }, onPressFunction) {
    const handleSelect = (e) => onPressFunction(e, noteId)
    return (
      <Menu onSelect={handleSelect}>
        <MenuTrigger>
          <Icon name="more-vert"
            size={Metrics.icons.medium}
            color={Colors.iconDark}
            style={styles.navButtonLeft}
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value="share">
            <Text>Share</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    )
  },

}
