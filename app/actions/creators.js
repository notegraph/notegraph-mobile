// @flow weak

import R from 'ramda'
import types from './types'
import { Actions as RouteActions, ActionConst } from 'react-native-router-flux'
import { findRelatedNotes } from '../reducers/queries'

// type Thunk = (dispatch: ()=> void, getState: ()=> dictionary)

const openNote = (id, readMode) => (dispatch, getState) => {
  const note = getState().notes[id]

  dispatch({
    type: types.OPEN_NOTE,
    payload: { note },
    isReadMode: readMode,
  })

  if (readMode) RouteActions.noteView({ noteId: id })
  else RouteActions.noteEdit({ noteId: id })
}

const newNote = () => {
  RouteActions.noteEdit({ noteId: null })
  return { type: types.NEW_NOTE }
}

// const newRelation = (noteId) => {
//   RouteActions.newRelation({ noteId })
// }

function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}


const saveNote = (note, ownerNoteId) => (dispatch, getState) => {
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
      owner: ownerNoteId,
    }
  })

  if (isNew) {
    RouteActions.noteView({ noteId: id, type: ActionConst.REPLACE })
  } else {
    RouteActions.pop()
  }
}


const deleteNote = (noteId: string) => (dispatch, getState) => {
  // FIXME: remove dependency on active note
  const state = getState()
  const { notes, editor } = state

  const activeNote = notes[noteId]
  if (!activeNote || !activeNote.id) return

  const { groupId } = editor

  const rels = findRelatedNotes(state, groupId, noteId)
  for (const rel of rels) {
    dispatch(deleteRelation(groupId, rel.con.id))
  }

  const groupItems = R.path(['groups', groupId, 'items'], state)
  const children = R.filter(R.propEq('owner', noteId), groupItems)
  for (const item of children) {
    dispatch(deleteNote(item.id))
  }

  dispatch({
    type: types.DELETE_NOTE,
    noteId,
    groupId,
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

  if (!groupId || !relId) {
    console.warn('deleteRelation, insufficient parameters')
    console.log({ n: 'deleteRelation', groupId, relId })
    return { type: 'EMPTY' }
  }

  return {
    type: types.DELETE_RELATION,
    groupId,
    relId,
  }
}

const setEditorReadMode = (mode = true) => {
  return {
    type: types.SET_EDITOR_MODE,
    isReadMode: true,
  }
}



export default {
  newNote,
  openNote,
  saveNote,
  deleteNote,
  saveRelation,
  deleteRelation,
  setEditorReadMode,
}

// types

type Rel = {
  from: string,
  to: string,
  type: string,
}
