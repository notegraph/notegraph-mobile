// @flow weak

import R from 'ramda'

import actions from '../../app/actions/creators'
import { createTestStore } from '../../app/redux/createStore'

jest.mock('react-native-router-flux', () => ({
  ActionConst: {
    REPLACE: 'REPLACE'
  },
  Actions: {
    noteView: jest.fn()
  }
}))



const getNoteByTitle = title =>
  R.compose(
    R.find(R.propEq('title', title)),
    R.map(R.nth(1)),
    R.toPairs,
  )

describe('reducers', () => {
  test('add note', async () => {
    const store = createTestStore()
    const noteData = {
      title: 'test note',
      text: 'new 123',
    }
    await store.dispatch(actions.saveNote(noteData, 'a1'))

    const { notes, groups, editor } = store.getState()

    const note = getNoteByTitle(noteData.title)(notes)
    expect(!!note).toBe(true)
    expect(note.text).toBe(noteData.text)

    const group = groups[editor.groupId]
    const item = R.find(R.propEq('id', note.id))(group.items)

    expect(item).not.toBeUndefined()
    expect(item).toHaveProperty('owner', 'a1')

    const findNoteById = () => store.getState().notes[note.id]

    // test delete now
    expect(findNoteById()).not.toBeUndefined()
    await store.dispatch(actions.deleteNote(note.id))
    expect(findNoteById()).toBeUndefined()
  })


  test('delete note with relations', async () => {
    const store = createTestStore()
    const groupId = 'g-mmap1'
    const noteId = 'a1'
    const findCon = R.compose(
      R.find(R.propEq('a', noteId)),
      R.path(['groups', groupId, 'cons']),
    )
    const findGroupItem = R.compose(
      R.find(R.propEq('id', noteId)),
      R.path(['groups', groupId, 'items']),
    )


    expect(findCon(store.getState())).not.toBeUndefined()
    await store.dispatch(actions.deleteNote(noteId))

    const stateAfter = store.getState()

    expect(findCon(stateAfter)).toBeUndefined()
    expect(findGroupItem(stateAfter)).toBeUndefined()
  })

  test('delete parent note', async () => {
    const store = createTestStore()
    const noteId = 'c'
    const findNote = (state, id) => state.notes[id]

    const notesBefore = store.getState().notes
    expect(notesBefore).toHaveProperty('c')
    expect(notesBefore).toHaveProperty('d')

    await store.dispatch(actions.deleteNote(noteId))

    const notesAfter = store.getState().notes
    expect(notesAfter).not.toHaveProperty('c')
    expect(notesAfter).not.toHaveProperty('d')
  })


  test('add and remove relation', async () => {
    const store = createTestStore()

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
    ).toBeUndefined()

    await store.dispatch(actions.saveRelation(groupId, rel))

    const addedRel = findCon(store.getState())
    expect(addedRel).not.toBeUndefined()

    expect(addedRel).toHaveProperty('a', 'c')
    expect(addedRel).toHaveProperty('type', 'custom')
    expect(addedRel).toHaveProperty('id')

    const getConsCount = () => R.path(['groups', groupId, 'cons'])(store.getState()).length

    const consLen = getConsCount()
    await store.dispatch(actions.deleteRelation(groupId, addedRel.id))


    expect(
      findCon(store.getState())
    ).toBeUndefined()

    expect(getConsCount()).toBe(consLen - 1)
  })
})
