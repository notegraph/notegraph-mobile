import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
} from 'react-native'
import R from 'ramda'


import { Fonts } from '../themes'
import FoundNote from './FoundNote'

const matchKeyword = (note, kw) => {
  if (!note || !note.text) return false

  return (note.title && note.title.indexOf(kw) !== -1) || note.text.indexOf(kw) !== -1;
}

class SearchComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keywords: '',
      matchedNotes: props.allRecords,
    }
  }

  handleKeywordChange = (keywords) => {
    const { allRecords } = this.props

    if (keywords && keywords.length >= 2) {
      const matchedNotes = R.filter(x => matchKeyword(x, keywords))(allRecords)
      this.setState({
        keywords,
        matchedNotes,
      })
    } else {
      this.setState({
        keywords,
        matchedNotes: allRecords,
      })
    }
  }

  renderResults () {
    const { matchedNotes } = this.state
    if (!matchedNotes.length) {
      return (
        <View style={styles.noResultsWrapper}>
          <Text style={styles.noResults}>No matching notes</Text>
        </View>
      )
    }

    return matchedNotes.map((note, index) =>
      <FoundNote
        key={note.id}
        note={note}
        index={index}
        onSelect={this.props.onSelect}
      />
    )
  }

  render () {
    return (
      <View>
        <TextInput
          placeholder="Search"
          onChangeText={this.handleKeywordChange}
          style={styles.searchInput}
        />
        <ScrollView style={styles.results}>
          {this.renderResults()}
        </ScrollView>
      </View>
    )
  }
}

SearchComponent.propTypes = {
  allRecords: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: 'white',
  },
  results: {
    marginTop: 5,
  },
  noResultsWrapper: {

  },
  noResults: {
    textAlign: 'center',
    fontSize: Fonts.size.h5,
  }
})

export default SearchComponent
