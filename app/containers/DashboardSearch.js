import PropTypes from 'prop-types'
import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'

import { AppStyles, Colors } from '../themes'

import actions from '../actions/creators'
import SearchComponent from '../components/SearchComponent'
import { selectActiveGroupNotes } from '../selectors/noteSelectors'

const DashboardSearch = ({ allItems, onOpenNote }) => (
  <View style={styles.container}>
    <SearchComponent
      allRecords={allItems}
      onSelect={onOpenNote}
    />
  </View>
)

DashboardSearch.propTypes = {
  allItems: PropTypes.array.isRequired,
  onOpenNote: PropTypes.func,
}

const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: Colors.background,
  },

})



function mapStateToProps (state, props) {
  const allItems = selectActiveGroupNotes(state, props)
  console.log({ allItems })

  return {
    allItems,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onOpenNote: (note) => dispatch(actions.openNote(note.id, true))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSearch)
