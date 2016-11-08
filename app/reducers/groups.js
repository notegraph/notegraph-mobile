import R from 'ramda'
import { createReducer } from 'reduxsauce'
import types from '../actions/types'
import Immutable from 'seamless-immutable'


import defaultState from './defaultState'
const INITIAL_STATE = Immutable(defaultState.groups)



const saveNote = (state, action) => {
  const { groupId, note } = action.payload

  return state.updateIn([groupId, 'items'], items => {
    if (!items) return items
    const idx = R.findIndex(R.propEq('id', note.id))(items)
    if (idx === -1) {
      return R.append({ id: note.id }, items)
    }
    return items
  })
}

const saveRelation = (state, action) => {
  const { groupId, rel } = action
  return state.updateIn([groupId, 'cons'], cons => {
    return R.append(rel, cons)
  })
}


const ACTION_HANDLERS = {
  [types.SAVE_NOTE]: saveNote,
  [types.SAVE_RELATION]: saveRelation,
}


export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
