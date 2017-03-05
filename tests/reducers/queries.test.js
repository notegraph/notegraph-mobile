import test from 'ava'

import { expect } from 'chai'

import R from 'ramda'

import defState from '../../app/reducers/defaultState'
import { findRelatedNotes, findParentNotes } from '../../app/reducers/queries'
import relTypes from '../../app/constants/relTypes'



test('findRelatedNotes', t => {
  const rel = findRelatedNotes(defState, 'g-mmap1', 'a1')

  expect(rel).to.have.length(1)
  expect(rel[0]).to.have.deep.property('note.id', 'b1')
})

test('find related by ownership', t => {
  const rel = findRelatedNotes(defState, 'g-mmap1', 'd')
  expect(rel).to.have.length(1)
  expect(rel[0]).to.have.deep.property('note.id', 'c')
  expect(rel[0]).to.have.deep.property('con.type', relTypes.owns)
  expect(rel[0]).to.have.property('noteOnEnd', true)

  const ownerRels = findRelatedNotes(defState, 'g-mmap1', 'c')

  // console.log({ ownerRels: JSON.stringify(ownerRels) })
  const ownerRel = R.find(x => R.path(['con', 'a'], x) === 'c')(ownerRels)
  expect(ownerRel).to.not.be.undefined
  expect(ownerRel).to.have.deep.property('note.id', 'd')
})

test('find parent notes in mindmap', t => {
  const rel = findParentNotes(defState, 'g-mmap1', 'd')

  expect(rel).to.have.length(1)
  const [b1] = rel
  // expect(c.con).to.shallowDeepEqual({a: 'c', b: 'd', type: 'owns'})
  // expect(c).to.have.property('noteOnEnd', false)
  expect(b1.con).to.shallowDeepEqual({a: 'b1', b: 'c', type: 'owns'})
  expect(b1.note).to.not.contain.key('owner')
  expect(b1).to.have.property('noteOnEnd', false)
})
