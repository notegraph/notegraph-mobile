/** *eslint ignore */
// TODO: `cons` possibly need to be move

// notes ownership, in group.items.owner



export default {
  notes: {
    a1: {
      id: 'a1',
      title: 'Start here',
      text:
`Hello, thank you for installing the app.
The key feature of notegraph is ability to connect notes.
You can have parent-child relationship (as in mindmap). Or you can connect any notes in the graph, defining connection type manually.

Take a moment to play with it. Things are not perfect yet... Please help us to make it better!
`
    },
    b1: {
      id: 'b1',
      text:
`This is a related note.

p. s. titles are optional, but highly encouraged
circle at the bottom shows number of connections
`,
      tags: ['todo', 'sample'],
    },
    c: { id: 'c', text: 'This is a child note ... ' },
    d: { id: 'd', text: 'hierarchy is not limited, its your ideas' },

    // fa: { id: 'fa', title: 'A' },
    // fb: { id: 'fb', title: 'B' },
    // fc: { id: 'fc', title: 'C' },
    // fd: { id: 'fd', title: 'D' },
  },

  notebooks: {
    byId: {
      'ngbook1': {
        id: 'ngbook1',
        title: 'some notebook',
        desc: 'some descripbn ...',
        tags: {
          todo: {
            title: 'ToDO',
            icon: 'i-todo',
          },
          'optional': {
            title: 'Usage sample',
          }
        },
        // noteIds: ['a1', 'b1', 'c', 'fa', 'fb', 'fc', 'fd'],
        // FIXME: which is the entry group for this notebook?
        groupIds: ['g-mmap1', 'g-flow1']
      },
    },
    allIds: ['ngbook1'],
  },

  groups: {
    'g-mmap1': {
      id: 'g-mmap1',
      title: 'Main group',
      entrypoint: true,
      items: [
        { id: 'a1', bgcolor: 'yellow' },
        { id: 'b1' },
        { id: 'c', owner: 'b1' },
        { id: 'd', owner: 'c' },
      ],

      cons: [
        { id: 1, a: 'a1', b: 'b1', type: 'related' },
        // { id: 2, a: 'b1', b: 'c',
        //   type: 'custom',
        //   desc: 'how are they related...',
        //   nondir: true, // non directional
        // }
      ],

    },

    // 'g-flow1': {
    //   id: 'g-flow1',
    //   layout: 'flowchart',
    //   title: 'Flow chart group',
    //   items: [
    //     { id: 'fa', type: 'flow-process' },
    //     { id: 'fb', type: 'flow-process' },
    //     { id: 'fc', type: 'flow-process' },
    //     { id: 'fd', type: 'flow-decision' },
    //   ],
    //   cons: [
    //     {id: 1, a: 'fa', b: 'fb'},
    //     {id: 2, a: 'fb', b: 'fc'},
    //     {id: 3, a: 'fb', b: 'fd', 'type': 'flow-follows'},
    //     {id: 4, a: 'fd', b: 'fa', 'type': 'flow-negative'},
    //   ]
    // },
  },

  editor: {
    notebookId: 'ngbook1',
    groupId: 'g-mmap1',
    note: 'fa1',
  }

}
