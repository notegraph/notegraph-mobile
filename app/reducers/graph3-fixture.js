/** eslint ignore */
// bDO: notes ownership

export default {
  notebooks: {
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

        fa: { id: 'fa', title: 'A' },
        fb: { id: 'fb', title: 'B' },
        fc: { id: 'fc', title: 'C' },
        fd: { id: 'fd', title: 'D' },
      },

      groups: {
        'g-mmap1': {
          id: 'g-mmap1',
          title: 'Main group',
          entrypoint: true,
          items: [
            { id: 'a1', bgcolor: 'yellow' },
            { id: 'b1', owner: 'a1' },
          ]
        },
        cons: [
          { a: 'a1', b: 'b1', type: 'defines' },
          { a: 'a1', b: 'b1',
            type: 'cusbm',
            desc: 'how are they related...',
            nondir: true, // non directional
          }
        ],
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
            {a: 'fa', b: 'fb'},
            {a: 'fb', b: 'fc'},
            {a: 'fb', b: 'fd', 'type': 'flow-follows'},
            {a: 'fd', b: 'fa', 'type': 'flow-negative'},
          ]
        },
      }
    },
  },

  editor: {
    notebook: 'ngbook1',
  }

}
