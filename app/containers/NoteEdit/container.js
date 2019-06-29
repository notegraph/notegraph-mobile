import { connect } from 'react-redux'
import actions from '../../actions/creators'
import { NoteEditView } from './component'

const mapStateToProps = (state, ownProps) => {
  const { noteId } = ownProps
  const { notes, editor } = state
  return {
    note: noteId ? notes[noteId] : {},
    isReadMode: editor.isReadMode,
    isNew: !noteId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { ownerNoteId } = ownProps
  return {
    saveNote: note => dispatch(actions.saveNote(note, ownerNoteId)),
  }
}

export const NodeEditContainer = connect(mapStateToProps, mapDispatchToProps)(NoteEditView)
