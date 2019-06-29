import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import {MenuContext} from 'react-native-menu'
import { PersistGate } from 'redux-persist/integration/react'


import { Colors } from './themes'

import { Provider } from 'react-redux'
import NavigationRouter from './navigation/NavigationRouter'
import configureStore from './redux/createStore'

const { store, persistor } = configureStore()


const Loading = () => (
  <View style={{ flex: 1 }}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
)

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    persistor: PropTypes.object,
  }

  render () {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <View style={styles.applicationView}>
            <StatusBar
              backgroundColor={Colors.statusBar}
              barStyle="default"
            />

            <MenuContext style={{ flex: 1 }}>
              <NavigationRouter />
            </MenuContext>
          </View>
        </PersistGate>
      </Provider>
    )
  }
}



const styles = StyleSheet.create({
  applicationView: {
    flex: 1
  }
})
