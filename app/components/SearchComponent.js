import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Text,
  Keyboard,
} from 'react-native'
import PropTypes from 'prop-types'
import R from 'ramda'


import { Fonts, Colors } from '../themes';
import FoundNote from './FoundNote'

const matchKeyword = (note, re) => {
  if (!note) return false

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
      <View style={styles.container}>
        <TextInput
          placeholder="Search"
          onChangeText={this.handleKeywordChange}
          style={styles.searchInput}
          autoFocus
        />
        <ScrollView style={styles.results} onScroll={Keyboard.dismiss}>
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
  container: {
    backgroundColor: 'white',
  },
  searchInput: {
    padding: 10,
    fontSize: Fonts.size.normal,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  results: {
    marginTop: 5,
  },
  noResultsWrapper: {
    padding: 10
  },
  noResults: {
    textAlign: 'center',
    fontSize: Fonts.size.h5,
  }
})

export default SearchComponent
