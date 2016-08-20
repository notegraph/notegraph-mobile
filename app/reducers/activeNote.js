import { createReducer } from 'reduxsauce'
import types from '../actions/types'
import Immutable from 'seamless-immutable'


const INITIAL_STATE = Immutable({
  opened: null,
})

const closeNote = (state, action) =>
  state.merge({ opened: null })



const openNote = (state, action) =>
  state.merge({ opened: action.payload.note })


const newNote = (state, action) =>
  state.merge({ opened: {} })


const ACTION_HANDLERS = {
  [types.NEW_NOTE]: newNote,
  [types.OPEN_NOTE]: openNote,
  [types.CLOSE_NOTE]: closeNote,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
