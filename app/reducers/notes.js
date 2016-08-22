// @flow

import { createReducer } from 'reduxsauce'
import types from '../actions/types'



const makeFakeData = (): string[] => {
  const notes = [
    'This is a single note',
    'Another one',
    'And next one here, this is a little bit longer than others ...',
    'Another one',
    'Yet Another one',
    'Yet Another one 2',
  ];

  [0, 2, 10, 4, 3].forEach((n, i) => {
    for (let m = 0; m < n; m++) notes[i] += ' ' + notes[i]
  })
  return notes.map((n, i) => ({id: i.toString(), text: n}))
}


const INITIAL_STATE = makeFakeData()


const add = (state, action) =>
  state.append(action.payload)

const ACTION_HANDLERS = {
  [types.ADD_NOTE]: add,
}


export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
