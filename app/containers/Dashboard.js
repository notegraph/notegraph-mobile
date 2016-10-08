import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import actions from '../actions/creators'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotesContainer from './NotesContainer'

import TakeANote from '../components/TakeANote'
import Routes from '../navigation/Routes'
import { AppStyles } from '../themes'


class Dashboard extends Component {

  render () {

    return (
      <View style={[styles.mainContainer, styles.container]} >
        <NotesContainer navToNote={this.navToNote} />
        <TakeANote onPress={this.navToNewnote} />
      </View>
    )
  }

  navToNote = () => {
    this.props.navigator.push(Routes.OpenedNote)
  }

  navToNewnote = () => {
    const { actions } = this.props
    actions.newNote()
    this.navToNote()
  }
}

Dashboard.propTypes = {
  navigator: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { actions: bindActionCreators(actions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)


const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: '#ccc',
  },

})
