import { createReducer } from 'reduxsauce'
import types from '../actions/types'
import Immutable from 'seamless-immutable'


// TODO: hardcoded for now

const INITIAL_STATE = Immutable({
  note: null,
  notebookId: 'ngbook1',
  groupId: 'g-mmap1',
})




// const closeNote = (state, action) =>
//   state.merge({ note: null })

// const openNote = (state, action) =>
//   state.merge({ note: action.payload.note })


// const newNote = (state, action) =>
//   state.merge({ note: {} })

// const saveNote = (state, action) =>
//   state.merge({ note: action.payload.note })


const ACTION_HANDLERS = {
  // [types.NEW_NOTE]: newNote,
  // [types.OPEN_NOTE]: openNote,
  // [types.CLOSE_NOTE]: closeNote,
  // [types.SAVE_NOTE]: saveNote,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
