import { combineReducers } from 'redux'
import notes from './notes'
import notebooks from './notebooks'
import editor from './editor'
import groups from './groups'

// glue all the reducers together into 1 root reducer
export default combineReducers({

  notebooks,
  notes,
  groups,

  editor
})

// Put reducer keys that you do NOT want stored to persistence here
// export const persistentStoreBlacklist = ['login']
