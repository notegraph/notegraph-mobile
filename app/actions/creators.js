import R from 'ramda'
import types from './types'

const openNote = (id) => (dispatch, getState) => {
  const findNote = R.find(R.propEq('id', id))
  const note = findNote(getState().notes)

  dispatch({
    type: types.OPEN_NOTE,
    payload: { note },
  })
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}



const newNote = () => ({ type: types.NEW_NOTE })


const saveNote = (note) => {
  let isNew = false
  let { id } = note
  if (!id) {
    id = guid()
    isNew = true
  }

  return {
    type: types.SAVE_NOTE,
    payload: {
      note: { ... note, id },
      isNew
    }
  }
}

const deleteActiveNote = () => (dispatch, getState) => {
  const activeNote = getState().activeNote.opened

  if (!activeNote || !activeNote.id) return;

  dispatch({
    type: types.DELETE_NOTE,
    payload: {
      id: activeNote.id,
    }
  })
}

export default {
  newNote,
  openNote,
  saveNote,
  deleteActiveNote,
}
