import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Navigator
} from 'react-native'
import { Provider } from 'react-redux'

import { NavigationBar, Routes, Router } from './navigation'

import Dashboard from './containers/Dashboard'

export default class Root extends Component {
  propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    return (
      <Provider store={this.props.store}>
          <Navigator
            ref={(ref) => { this.navigator = ref }}
            initialRoute={Routes.Dashboard}
            configureScene={Router.configureScene}
            renderScene={Router.renderScene}
            navigationBar={NavigationBar.render()}
            // style={styles.container}
          />
      </Provider>
    )
  }
}



