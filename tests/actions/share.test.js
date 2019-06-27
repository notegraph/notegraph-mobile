import defaultState from '../../app/reducers/defaultState'
import {exportNotebook} from '../../app/actions/share'


describe('share feature', () => {
  test('exportNotebook', () => {
    const dispatch = jest.fn()

    return new Promise(resolve => {
      const done = (text) => {
        expect(text).toMatch(/This is a child note/)
        expect(text.split('\n--\n')).toHaveLength(5)
        resolve()
      }
      exportNotebook(done)(dispatch, () => defaultState)
    })
  })
})
