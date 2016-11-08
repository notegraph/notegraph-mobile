import test from 'ava'
import { expect } from 'chai'

import R from 'ramda'

import defState from '../../app/reducers/defaultState'
import { findRelatedNotes } from '../../app/reducers/queries'


test('findRelatedNotes', t => {
  const rel = findRelatedNotes(defState, 'g-mmap1', 'a1')

  expect(rel).to.have.length(1)
  expect(rel[0]).to.have.deep.property('note.id', 'b1')
})
