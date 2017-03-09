import { createSelector } from 'reselect'
import R from 'ramda'
import { findRelatedNotes } from '../reducers/queries'


const selectGroupDomain = (state) => state.groups
const selectNotesDomain = (state) => state.notes


const selectActiveGroupId = (state) => R.path(['editor', 'groupId'])(state)



export const selectActiveGroupItems = createSelector(
  selectGroupDomain,
  selectNotesDomain,
  selectActiveGroupId,
  (groups, notes, groupId) => {
    const group = groups[groupId] || {}
    const items = R.filter(x => !x.owner)(group.items || [])

    const limitedState = {
      groups,
      notes
    }

    return items.map(
        item => {
          // FIXME: this could be the source of performance problems
          // there should be more effective way to deal with graphs
          const rels = findRelatedNotes(limitedState, groupId, item.id)
          return { item, note: notes[item.id], relsCount: rels.length }
        }
    )
  }
)


export const selectActiveGroupNotes = createSelector(
  selectNotesDomain,
  (notes) => R.toPairs(notes).map(([id, note]) => note).filter(note => typeof note === 'object')
)
