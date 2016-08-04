/* @flow */

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Provider } from 'react-redux'

import NotesContainer from './containers/NotesContainer'
import TakeANote from './containers/TakeANote'


export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render(){
    return (
      <Provider store={this.props.store}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text>NG Notes</Text>
          </View>
          <NotesContainer />
          <TakeANote />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: '#ccc',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: 'orange'

  },
  headerText: {
    //backgroundColor: '#F5FCFF',
  },
});
