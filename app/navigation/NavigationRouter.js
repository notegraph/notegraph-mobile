import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import styles from './styles/NavigationContainerStyle'
import itemStyle from './styles/NavItemsStyle'
import NavItems from './NavItems'

import { connect } from 'react-redux'
import { Actions as RouteActions } from 'react-native-router-flux';


// screens identified by the router
import Dashboard from '../containers/Dashboard'
import OpenedNote from '../containers/OpenedNote'

import actions from '../actions/creators'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/


class NavigationRouter extends Component {

  render () {
    return (
      <Router >
        <Scene key="root" navigationBarStyle={styles.navBar} >

          <Scene initial key='dashboard' component={Dashboard} title='Notes'  />
          <Scene
            key='openedNote' component={OpenedNote} title='Active Note'
            renderBackButton={NavItems.backButton}
            renderRightButton={() => NavItems.deleteNoteButton(this.props.deleteNote)}
          />
        </Scene>
      </Router>
    )
  }
}


function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNote: () => {
      dispatch(actions.deleteActiveNote())
      RouteActions.pop()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
