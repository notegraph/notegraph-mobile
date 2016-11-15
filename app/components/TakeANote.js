import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'


// TODO: obsolete, remove
const TakeANote = ({ onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.footer} >
      <Text style={styles.footerText}>Take a Note</Text>
    </View>
  </TouchableHighlight>
)

TakeANote.propTypes = {
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  footer: {
    // flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  footerText: {
    textAlign: 'left',
    color: '#333333',
  },


})


export default TakeANote
