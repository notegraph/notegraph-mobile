import React, { Component, PropTypes } from 'react'
import { Scene, Router, Actions as RouteActions } from 'react-native-router-flux'
import styles from './styles/NavigationContainerStyle'
// import itemStyle from './styles/NavItemsStyle'
import NavItems from './NavItems'

import { connect } from 'react-redux'

// screens identified by the router
import Dashboard from '../containers/Dashboard'
import NoteEdit from '../containers/NoteEdit'
import NoteView from '../containers/NoteView'
import AddRelation from '../containers/AddRelation'

import actions from '../actions/creators'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/


class NavigationRouter extends Component {

  renderDeleteBtn = () => NavItems.deleteNoteButton(this.props.deleteNote)

  render () {
    return (
      <Router >
        <Scene key="root" navigationBarStyle={styles.navBar} >

          <Scene initial key="dashboard" component={Dashboard} title="Notes" />
          <Scene
            key="noteEdit" component={NoteEdit} title="Active Note"
            renderBackButton={NavItems.backButton}
            renderRightButton={this.renderDeleteBtn}
          />
          <Scene
            key="noteView" component={NoteView} title="Active Note"
            renderBackButton={NavItems.backButton}
            renderRightButton={this.renderDeleteBtn}
          />
          <Scene
            key="newRelation" component={AddRelation} title="Add Connection"
            renderBackButton={NavItems.backButton}
          />

        </Scene>
      </Router>
    )
  }
}

NavigationRouter.propTypes = {
  deleteNote: PropTypes.func.isRequired,
}


function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    deleteNote: () => {
      dispatch(actions.deleteActiveNote())
      RouteActions.pop()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
