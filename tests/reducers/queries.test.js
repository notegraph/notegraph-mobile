import R from 'ramda'

import defState from '../../app/reducers/defaultState'
import { findRelatedNotes, findParentNotes } from '../../app/reducers/queries'
import relTypes from '../../app/constants/relTypes'



describe('queries', () => {
  test('findRelatedNotes', () => {
    const rel = findRelatedNotes(defState, 'g-mmap1', 'a1')

    expect(rel).toHaveLength(2)
    expect(rel[0]).toHaveProperty('note.id', 'm')
  })

  test('find related by ownership', () => {
    const rel = findRelatedNotes(defState, 'g-mmap1', 'd')
    expect(rel).toHaveLength(1)
    expect(rel[0]).toHaveProperty('note.id', 'c')
    expect(rel[0]).toHaveProperty('con.type', relTypes.owns)
    expect(rel[0]).toHaveProperty('noteOnEnd', true)

    const ownerRels = findRelatedNotes(defState, 'g-mmap1', 'c')

  // console.log({ ownerRels: JSON.stringify(ownerRels) })
    const ownerRel = R.find(x => R.path(['con', 'a'], x) === 'c')(ownerRels)
    expect(ownerRel).not.toBeUndefined()
    expect(ownerRel).toHaveProperty('note.id', 'd')
  })

  test('find parent notes in mindmap', () => {
    const rel = findParentNotes(defState, 'g-mmap1', 'd')

    expect(rel).toHaveLength(1)
    const [b1] = rel
  // expect(c.con).toMatchObject({a: 'c', b: 'd', type: 'owns'})
  // expect(c).toHaveProperty('noteOnEnd', false)
    expect(b1.con).toMatchObject({a: 'b1', b: 'c', type: 'owns'})
    expect(b1.note).not.toHaveProperty('owner')
    expect(b1).toHaveProperty('noteOnEnd', false)
  })
})
