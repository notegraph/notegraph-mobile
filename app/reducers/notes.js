// @flow
import R from 'ramda';

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
    for (let m = 0; m < n; m++) notes[i] += ' ' + i + ' ' + notes[i]
  })
  return notes.map((n, i) => ({id: i.toString(), text: n}))
}

const INITIAL_STATE = makeFakeData()

const add = (state, action) =>
  state.append(action.payload)


const save = (state, action) => {
  const { isNew, note } = action.payload;
  if (isNew) {
    return R.append(note, state)
  }
  else {
    const index = R.findIndex(R.propEq('id', note.id))(state)
    if (index === -1) {
      console.warn(`Cannot find index for id=${note.id}`)
      return state
    }
    return R.adjust(x => R.merge(x, note), index, state)
  }
}

const ACTION_HANDLERS = {
  [types.ADD_NOTE]: add,
  [types.SAVE_NOTE]: save,
}


export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
