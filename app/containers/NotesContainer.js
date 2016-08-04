import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux'


const notesColumn = (notes: string[], isEven: bool) => {
  return notes.map( (text, i) => {
      if (isEven && (i % 2) === 1 ) return;
      if (!isEven && (i % 2) === 0 ) return;
      return (
        <View style={[styles.note]} key={i}>
          <Text>{text}</Text>
        </View>
      )
    }
  );
}

const NotesContainer = ({ notes }) => {
  const layoutWidth = Dimensions.get('window').width;
  const columnStyle = StyleSheet.create({
    runtime: {
      width: layoutWidth / 2 - 15,
    }
  })

  return (
    <View style={styles.content}>
      <View style={columnStyle.runtime}>
        {notesColumn(notes, true)}
      </View>
      <View style={columnStyle.runtime}>
        {notesColumn(notes, false)}
      </View>
    </View>
  )
}


NotesContainer.propTypes = {
  notes: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  content: { // notes
    flex: 1,
    //fontSize: 20,
    //textAlign: 'center',
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  note: {
    minHeight: 30,
    maxHeight: 200,
    margin: 5,
    padding: 5,

    backgroundColor: '#fff'
  },

});


const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

export default connect(mapStateToProps)(NotesContainer)