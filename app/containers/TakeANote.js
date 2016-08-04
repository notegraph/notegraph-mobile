import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';


const TakeANote = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Take a Note</Text>
  </View>
)

export default TakeANote



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


});
