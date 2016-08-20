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

const addNote = () => ({ type: types.ADD_NOTE })

export default {
  addNote,
  openNote,
}
