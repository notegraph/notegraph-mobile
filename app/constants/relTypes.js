const relTypes = {
  owns: 'owns',
  related: 'related',
  defines: 'defines',
  custom: 'custom',
}

export const relNames = {
  [relTypes.related]: 'Related',
  [relTypes.owns]: 'Contains',
  [relTypes.defines]: 'Defines',
  [relTypes.custom]: 'Custom',
}

export const onStartIcons = {
  [relTypes.related]: 'settings-ethernet',
  [relTypes.owns]: 'arrow-forward',
  [relTypes.defines]: 'subdirectory-arrow-right',
  [relTypes.custom]: 'swap-calls',
}

export const onEndIcons = {
  [relTypes.related]: 'settings-ethernet',
  [relTypes.owns]: 'arrow-back',
  [relTypes.defines]: 'subdirectory-arrow-left',
  [relTypes.custom]: 'swap-calls',
}


export default relTypes
