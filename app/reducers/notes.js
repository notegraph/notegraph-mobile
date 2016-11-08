// @flow
import R from 'ramda'
import Immutable from 'seamless-immutable'

import { createReducer } from 'reduxsauce'
import types from '../actions/types'


import defaultState from './defaultState'
const INITIAL_STATE = Immutable(defaultState.notes)


// const makeFakeData = (): string[] => {
//   const notes = [
//     'This is a single note',
//     'Another one',
//     'And next one here, this is a little bit longer than others ...',
//     'Another one',
//     'Yet Another one',
//     'Yet Another one 2',
//   ];

//   [0, 2, 10, 4, 3].forEach((n, i) => {
//     for (let m = 0; m < n; m++) notes[i] += ' ' + i + ' ' + notes[i]
//   })
//   const data = notes.map((n, i) => ({id: i.toString(), text: n }))
//   return Immutable(data)
// }

// const INITIAL_STATE = makeFakeData()

// const add = (state, action) =>
//   state.append(action.payload)


const save = (state, action) => {
  const { isNew, note } = action.payload
  return state.set(note.id, note)
}

const deleteNote = (state, action) => {
  const { id } = action.payload
  return R.reject(R.propEq('id', id))(state)
}

const ACTION_HANDLERS = {
  // [types.ADD_NOTE]: add,
  [types.SAVE_NOTE]: save,
  [types.DELETE_NOTE]: deleteNote,
}


export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
