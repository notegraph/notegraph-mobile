import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import actions from '../actions/creators'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NotesContainer from './NotesContainer'

// import TakeANote from '../components/TakeANote'
import ActionButton from '../components/ActionButton'


import { AppStyles, Colors } from '../themes'


class Dashboard extends Component {
  render () {
    return (
      <View style={[styles.mainContainer, styles.container]} >
        <NotesContainer />
        <View style={styles.buttonsFooter}>
          <ActionButton onPress={this.navToNewnote} />
        </View>
      </View>
    )
  }

  navToNewnote = () => {
    const { actions } = this.props
    actions.newNote()
  }
}

Dashboard.propTypes = {
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
    backgroundColor: Colors.background,
  },
  buttonsFooter: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  }
})
