import { combineReducers } from 'redux'
import notes from './notes'
import activeNote from './activeNote'

// glue all the reducers together into 1 root reducer
export default combineReducers({
  notes,
  activeNote
})

// Put reducer keys that you do NOT want stored to persistence here
// export const persistentStoreBlacklist = ['login']
