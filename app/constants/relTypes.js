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
  [relTypes.related]: 'compare-arrows',
  [relTypes.owns]: 'arrow-forward',
  [relTypes.defines]: 'arrow-forward',
  [relTypes.custom]: 'settings-ethernet',
}

export const onEndIcons = {
  [relTypes.related]: 'compare-arrows',
  [relTypes.owns]: 'arrow-back',
  [relTypes.defines]: 'arrow-back',
  [relTypes.custom]: 'settings-ethernet',
}


export default relTypes
