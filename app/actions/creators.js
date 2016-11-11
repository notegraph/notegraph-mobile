// @flow weak

import R from 'ramda'
import types from './types'
import { Actions as RouteActions } from 'react-native-router-flux'


// type Thunk = (dispatch: ()=> void, getState: ()=> dictionary)

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


const saveRelation = (groupId: string, rel: Rel) => (dispatch, getState) => {
  const { notes } = getState()
  if (!notes[rel.from] || !notes[rel.to]) {
    console.warn('incorrect from or to')
    return
  }


  dispatch({
    type: types.SAVE_RELATION,
    groupId,
    rel: {
      id: guid(),
      a: rel.from,
      b: rel.to,
      type: rel.type,
    },
  })
}

const deleteRelation = (groupId: string, relId: string) => {
  return {
    type: types.DELETE_RELATION,
    groupId,
    relId,
  }
}


export default {
  newNote,
  openNote,
  saveNote,
  deleteActiveNote,
  saveRelation,
  deleteRelation,
}

// types

type Rel = {
  from: string,
  to: string,
  type: string,
}
