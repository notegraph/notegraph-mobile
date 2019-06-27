import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import R from 'ramda'


import { Fonts } from '../themes'
import FoundNote from './FoundNote'

const matchKeyword = (note, re) => {
  if (!note || !note.text) return false

  return re.test(note.title) || re.test(note.text)
}

const regexFromUserInput = (inputstring) => {
  const input = inputstring.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  return new RegExp(input, 'i')
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
      const matchRe = regexFromUserInput(keywords)
      const matchedNotes = R.filter(x => matchKeyword(x, matchRe))(allRecords)
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
