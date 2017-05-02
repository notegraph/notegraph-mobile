import {findRelatedNotes} from '../reducers/queries'

function noteToText (noteId, notes, includeKids = true) {
  const note = notes[noteId]
  if (!note) return ''
  const resp = []
  if (note.title) resp.push(`# ${note.title}`)
  resp.push(note.text)

  if (includeKids) {
    // TODO
  }

  return resp.join('\n')
}


export const exportNotebook = (callback) => (dispatch, getState) => {
  const {editor, groups, notes} = getState()
  // debugger
  // const notebook = notebooks.byId[editor.notebookId]
  console.log({gkeys: Object.keys(groups), editor})
  const group = groups[editor.groupId]

  const items = group.items

  // TODO: order them properly
  const allText = items.map(({id}) => {
    return noteToText(id, notes, true)
  }).filter(x => !!x)

  const text = allText.join('\n--\n')
  callback(text)
}
