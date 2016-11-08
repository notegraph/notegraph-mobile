import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import R from 'ramda'

import { connect } from 'react-redux'
import { AppStyles, Colors, Metrics } from '../themes'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions as RouteActions } from 'react-native-router-flux'


import actions from '../actions/creators'

import { findRelatedNotes } from '../reducers/queries'
import RelatedNote from '../components/RelatedNote'



const {height, width} = Dimensions.get('window')


const mapStateToProps = (state) => {
  const { editor } = state
  const note = editor.note || {}

  const related = findRelatedNotes(state, editor.groupId, note.id)
  return {
    note,
    related,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editNote: (id) => dispatch(actions.openNote(id, false)),
    viewNote: (id) => dispatch(actions.openNote(id, true)),
    addRelation: () => RouteActions.newRelation(),
  }
}


function AddButton ({onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="add-circle"
        size={Metrics.icons.button}
        style={style}
      />
    </TouchableOpacity>
  )
}

class NoteView extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    related: PropTypes.arrayOf(
      PropTypes.shape({
        con: PropTypes.object.isRequired,
        note: PropTypes.object.isRequired,
      })
    ).isRequired,
    editNote: PropTypes.func.isRequired,
    viewNote: PropTypes.func.isRequired,
    addRelation: PropTypes.func.isRequired,
  }



  editCurrentNote = () => {
    const { note, editNote } = this.props
    editNote(note.id)
  }

  renderRelated () {
    const { viewNote } = this.props



    return this.props.related.map(r => (
      <RelatedNote
        key={r.note.id}
        {...r}
        viewNote={viewNote}
      />)
    )
  }

  render () {
    const { note, addRelation } = this.props

    return (
    <View style={[styles.container]}>

      <View style={styles.noteContainer}>
        <TouchableOpacity onPress={this.editCurrentNote}>
          <Icon name="mode-edit"
            size={Metrics.icons.medium}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.text}>{note.text}</Text>
      </View>

      <View style={styles.relatedContainer}>
        {this.renderRelated()}
      </View>

      <View style={styles.buttonsFooter} >
        <AddButton
          onPress={addRelation}
        />
      </View>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  ...AppStyles.screen,
  container: {
    padding: 10,
    paddingTop: 50,
    flex: 1,
    flexDirection: 'row',

  },
  noteContainer: {
    flex: 3,
    // width: 100,
    // flex: -1,
    // flexWrap: 'wrap',
  },
  relatedContainer: {
    // width: 100,
    flex: 2,
    backgroundColor: '#eee',
    padding: 15,
  },

  title: {
    color: Colors.noteText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    // textAlignVertical: 'top',
    color: Colors.noteText,
    fontSize: 17,
    // // fontFamily: 'System',
    // // height: height - 30,
  },

  buttonsFooter: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  }

})



export default connect(mapStateToProps, mapDispatchToProps)(NoteView)
