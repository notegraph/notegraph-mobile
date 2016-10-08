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

const newNote = () => ({ type: types.NEW_NOTE })

export default {
  newNote,
  openNote,
}
