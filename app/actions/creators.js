import R from 'ramda'
import types from './types'
import { Actions as RouteActions } from 'react-native-router-flux'


const openNote = (id, readMode) => (dispatch, getState) => {
  const note = getState().notes[id]

  dispatch({
    type: types.OPEN_NOTE,
    payload: { note },
  })

  if (readMode) RouteActions.noteView(id)
  else RouteActions.noteEdit(id)
}

const newNote = () => {
  RouteActions.noteEdit()
  return { type: types.NEW_NOTE }
}

// const newRelation = (noteId) => {
//   RouteActions.newRelation({ noteId })
// }

function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}


const saveNote = (note) => (dispatch, getState) => {
  const { groupId, notebookId } = getState().editor
  let isNew = false
  let { id } = note
  if (!id) {
    id = guid()
    isNew = true
  }

  dispatch({
    type: types.SAVE_NOTE,
    payload: {
      note: { ...note, id },
      isNew,
      groupId,
      notebookId,
    }
  })
}


const deleteActiveNote = () => (dispatch, getState) => {
  const activeNote = getState().editor.note

  if (!activeNote || !activeNote.id) return

  dispatch({
    type: types.DELETE_NOTE,
    payload: {
      id: activeNote.id,
    }
  })
}


const saveRelation = (groupId, rel) => (dispatch, getState) => {
  const { notes } = getState().notes
  if (!notes[rel.from] || !notes[rel.to]) {
    console.warn('incorrect from or to')
    return
  }


  dispatch({
    type: types.SAVE_RELATION,
    groupId,
    rel: { a: rel.from, b: rel.to, type: rel.type },
  })
}

export default {
  newNote,
  openNote,
  saveNote,
  deleteActiveNote,
  saveRelation,
}
