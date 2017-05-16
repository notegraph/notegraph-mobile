import React, { Component, PropTypes } from 'react'
import { Alert } from 'react-native'

import { Scene, Router, Actions as RouteActions, ActionConst } from 'react-native-router-flux'
import styles from './styles/NavigationContainerStyle'
import NavItems from './NavItems'

import { connect } from 'react-redux'

// screens identified by the router
import Dashboard from '../containers/Dashboard'
import DashboardSearch from '../containers/DashboardSearch'
import NoteEdit from '../containers/NoteEdit'
import NoteView from '../containers/NoteView'
import AddRelation from '../containers/AddRelation'

import actions from '../actions/creators'
import NavigationDrawer from './NavigationDrawer'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/


const lightNav = {
  navigationBarStyle: styles.dashNavBar,
  titleStyle: styles.dashTitle,
}

class NavigationRouter extends Component {

  renderDeleteBtn = (navProps) => NavItems.deleteNoteButton(navProps, this.props.deleteNote)
  renderSaveButton = () => NavItems.saveNoteButton(this.props.setNoteEditorMode)

  backAndHomeButtons = () => NavItems.backAndHome()

  renderSearchBtn = () => NavItems.openSearch()

  renderHamburgerBtn = () => NavItems.hamburgerButton()

  backButton = () => NavItems.backButton()
  backButtonWhite = () => NavItems.backButton(true)

  render () {
    return (
      <Router>
        <Scene key="drawer" component={NavigationDrawer} open={false}>
          <Scene key="root"
            navigationBarStyle={styles.navBar}
            titleStyle={styles.title}
          >

            <Scene initial key="dashboard" component={Dashboard} title="Notes"
              renderRightButton={this.renderSearchBtn}
              renderBackButton={this.renderHamburgerBtn}
              {...lightNav}
            />
            <Scene key="search" component={DashboardSearch} title="Search"
              renderBackButton={this.backButtonWhite}
              {...lightNav}
            />
            <Scene
              key="noteEdit" component={NoteEdit} title="Edit Note"
              renderBackButton={this.renderSaveButton}
              renderRightButton={this.renderDeleteBtn}
            />
            <Scene
              key="noteView" component={NoteView}
              renderBackButton={this.backAndHomeButtons}
              renderRightButton={this.renderDeleteBtn}
            />
            <Scene
              key="newRelation" component={AddRelation} title="Add Connection"
              renderBackButton={this.renderBackButton}
            />

          </Scene>
        </Scene>
      </Router>
    )
  }
}

NavigationRouter.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  setNoteEditorMode: PropTypes.func.isRequired,
}


function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    deleteNote: (noteId) => {
      const doDelete = () => {
        dispatch(actions.deleteNote(noteId))
        RouteActions.dashboard({ type: ActionConst.RESET })
      }

      Alert.alert(
        'Remove note',
        'Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: doDelete },
        ]
      )
    },
    setNoteEditorMode: () => dispatch(actions.setEditorReadMode()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationRouter)
