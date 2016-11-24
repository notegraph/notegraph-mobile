import React, { Component, PropTypes } from 'react'
import { Alert } from 'react-native'

import { Scene, Router, Actions as RouteActions, ActionConst } from 'react-native-router-flux'
import styles from './styles/NavigationContainerStyle'
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

  renderDeleteBtn = (navProps) => NavItems.deleteNoteButton(navProps, this.props.deleteNote)
  renderSaveButton = () => NavItems.saveNoteButton(this.props.setNoteEditorMode)

  backAndHomeButtons = () => NavItems.backAndHome()

  render () {
    return (
      <Router titleStyle={styles.title} >
        <Scene key="root" navigationBarStyle={styles.navBar} >

          <Scene initial key="dashboard" component={Dashboard} title="Notes" />
          <Scene
            key="noteEdit" component={NoteEdit} title="Active Note"
            renderBackButton={this.renderSaveButton}
            renderRightButton={this.renderDeleteBtn}
          />
          <Scene
            key="noteView" component={NoteView} title="Active Note"
            renderBackButton={this.backAndHomeButtons}
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
