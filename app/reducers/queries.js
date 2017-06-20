/* @flow weak */

import R from 'ramda'
import relTypes from '../constants/relTypes'

export const findParentNotes = ({ groups, notes }, groupId, noteId): RelInfo[] => {
  const group = groups[groupId]

  const groupItem = R.find(R.propEq('id', noteId), group.items)

  const parents: Connection[] = []
  const collectParents = (n, level = 0) => {
    if (!n || !n.owner) return
    const p = R.find(R.propEq('id', n.owner), group.items)
    if (level) {
      parents.push({
        id: `${p.id}-${n.id}`,
        a: p.id,
        b: n.id,
        type: relTypes.owns,
      })
    }
    collectParents(p, ++level)
  }
  collectParents(groupItem)
  return R.reverse(parents).map(r => {
    return {
      con: r,
      note: notes[r.a],
      noteOnEnd: false,
    }
  })
}

export const findRelatedNotes = (state, groupId, noteId): RelInfo[] => {
  const { groups, notes } = state
  const group = groups[groupId]
  if (!group || !group.cons) return []

  const ownerRels: RelInfo[] = []
  const addOwnerRel = (a, b, type) => {
    ownerRels.push({
      con: { id: 'owner', a, b, type },
      note: a === noteId ? notes[b] : notes[a],
      noteOnEnd: b === noteId
    })
  }

  const groupItem = R.find(R.propEq('id', noteId), group.items)
  if (!groupItem) return []
  // add
  if (groupItem.owner) {
    addOwnerRel(groupItem.owner, noteId, relTypes.owns)
  }
  const children = R.filter(R.propEq('owner', noteId), group.items)
  children.forEach(x => addOwnerRel(noteId, x.id, relTypes.owns))

  return R.compose(
    R.concat(ownerRels),
    R.filter(R.prop('note')),
    R.uniqBy(x => {
      const con = x.con;
      return `${con.a}-${con.b}-${con.type}`
    }),
    R.map(con => {
      let relId
      if (con.a === noteId) relId = con.b
      else if (con.b === noteId) relId = con.a
      return { con, note: relId ? notes[relId] : null, noteOnEnd: con.b === noteId }
    })
  )(group.cons)
}

// types

type RelInfo = {
  con: Connection,
  note: Object,
  noteOnEnd: boolean,
}

type Connection = {
  id: string,
  a: string,
  b: string,
  type: string,
}
