import { createSelector } from 'reselect'
import R from 'ramda'

const selectGroupDomain = (state) => state.groups
const selectNotesDomain = (state) => state.notes


const selectActiveGroupId = (state) => R.path(['editor', 'groupId'])(state)



export const selectActiveGroupItems = createSelector(
  selectGroupDomain,
  selectNotesDomain,
  selectActiveGroupId,
  (groups, notes, groupId) => {
    const group = R.path([groupId], groups) || {}
    const items = R.filter(x => !x.owner)(group.items || [])
    return items.map(
        item => ({ item, note: notes[item.id] })
    )
  }
)


export const selectActiveGroupNotes = createSelector(
  selectActiveGroupItems,
  (items) => items.map(x => x.note)
)
