/** *eslint ignore */
// TODO: `cons` possibly need to be move

// notes ownership, in group.items.owner



export default {
  notes: {
    a1: {
      id: 'a1',
      title: 'Some title',
      text: 'text asdf',
    },
    b1: {
      id: 'b1',
      text: 'note without title',
      tags: ['bdo', 'require-attention'],
    },
    c: { id: 'c', text: 'something else ... ' },
    d: { id: 'd', text: 'bla' },

    fa: { id: 'fa', title: 'A' },
    fb: { id: 'fb', title: 'B' },
    fc: { id: 'fc', title: 'C' },
    fd: { id: 'fd', title: 'D' },
  },

  notebooks: {
    byId: {
      'ngbook1': {
        id: 'ngbook1',
        title: 'some notebook',
        desc: 'some descripbn ...',
        tags: {
          bdo: {
            title: 'bDO',
            icon: 'i-bdo',
          },
          'require-attention': {
            title: 'Requires Attention',
          }
        },
        noteIds: ['a1', 'b1', 'c', 'fa', 'fb', 'fc', 'fd'],
        groupIds: ['g-mmap1', 'g-flow1' ]
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
        { id: 'b1', owner: 'a1' },
        { id: 'c' },
      ],

      cons: [
        { id: 1, a: 'a1', b: 'b1', type: 'defines' },
        { id: 2, a: 'b1', b: 'c',
          type: 'custom',
          desc: 'how are they related...',
          nondir: true, // non directional
        }
      ],

    },

    'g-flow1': {
      id: 'g-flow1',
      layout: 'flowchart',
      title: 'Flow chart group',
      items: [
        { id: 'fa', type: 'flow-process' },
        { id: 'fb', type: 'flow-process' },
        { id: 'fc', type: 'flow-process' },
        { id: 'fd', type: 'flow-decision' },
      ],
      cons: [
        {id: 1, a: 'fa', b: 'fb'},
        {id: 2, a: 'fb', b: 'fc'},
        {id: 3, a: 'fb', b: 'fd', 'type': 'flow-follows'},
        {id: 4, a: 'fd', b: 'fa', 'type': 'flow-negative'},
      ]
    },
  },

  editor: {
    notebook: 'ngbook1',
    group: 'group1',
    note: 'fa1',
  }

}
