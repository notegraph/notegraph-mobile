// @flow weak

import test from 'ava'
import { expect } from 'chai'

import R from 'ramda'
import Immutable from 'seamless-immutable'

// import types from '../../app/actions/types'
import actions from '../../app/actions/creators'
import createStore from '../../app/store'
import groupsReducer from '../../app/reducers/groups'
// import notesReducer from '../../app/reducers/notes'
import defState from '../../app/reducers/defaultState'


const getNoteByTitle = title =>
  R.compose(
    R.find(R.propEq('title', title)),
    R.map(R.nth(1)),
    R.toPairs,
  )


test('add note', t => {
  const store = createStore()
  const noteData = {
    title: 'test note',
    text: 'new 123',
  }
  store.dispatch(actions.saveNote(noteData))

  const { notes, groups, editor } = store.getState()

  const note = getNoteByTitle(noteData.title)(notes)
  t.true(!!note)
  t.is(note.text, noteData.text)

  const group = groups[editor.groupId]
  const item = R.find(R.propEq('id', note.id))(group.items)

  expect(item).to.not.be.undefined
})

test('add and remove relation', t => {
  const store = createStore()

  const groupId = 'g-mmap1'
  const rel = {
    from: 'c',
    to: 'd',
    type: 'custom',
  }

  const findCon = R.compose(
    R.find(R.propEq('b', rel.to)),
    R.path(['groups', groupId, 'cons']),
  )

  expect(
    findCon(store.getState())
  ).to.be.undefined

  store.dispatch(actions.saveRelation(groupId, rel))

  const addedRel = findCon(store.getState())
  expect(addedRel).to.not.be.undefined

  expect(addedRel).to.have.property('a', 'c')
  expect(addedRel).to.have.property('type', 'custom')
  expect(addedRel).to.have.property('id')

  const getConsCount = () => R.path(['groups', groupId, 'cons'])(store.getState()).length

  const consLen = getConsCount()
  store.dispatch(actions.deleteRelation(groupId, addedRel.id))


  expect(
    findCon(store.getState())
  ).to.be.undefined

  expect(getConsCount()).to.be.equal(consLen - 1)
})

