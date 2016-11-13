/* @flow weak */

import R from 'ramda'


export const findRelatedNotes = (state, groupId, noteId) : RelInfo[] => {
  const { groups, notes } = state
  const group = groups[groupId]
  if (!group || !group.cons) return []
  // const relatedIds = R.compose(

  // )

  return R.compose(
    R.filter(R.prop('note')),
    R.map(con => {
      let relId
      if (con.a === noteId) relId = con.b
      else if (con.b === noteId) relId = con.a
      return { con, note: relId ? notes[relId] : null }
    })
  )(group.cons)
}

// tyes

type RelInfo = {
  con: any,
  note: any,
}
