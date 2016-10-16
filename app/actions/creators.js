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


const saveNote = ({id, text}) => {
  let isNew = false;
  if (!id) {
    id = guid();
    isNew = true;
  }

  return {
    type: types.SAVE_NOTE,
    payload: {
      note: { id, text },
      isNew
    }
  }
}

const newNote = () => ({ type: types.NEW_NOTE })

export default {
  newNote,
  openNote,
  saveNote,
}
