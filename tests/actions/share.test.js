import test from 'ava'
import defaultState from '../../app/reducers/defaultState'
import {exportNotebook} from '../../app/actions/share'
import sinon from 'sinon'


test.cb('exportNotebook', t => {
  const done = (text) => {
    t.regex(text, /This is a child note/)
    t.is(text.split('\n--\n').length, 5)
    t.end()
  }
  const dispatch = sinon.spy()
  exportNotebook(done)(dispatch, () => defaultState)
})
