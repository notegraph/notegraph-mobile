import { seamlessImmutableReconciler, seamlessImmutableTransformCreator } from 'redux-persist-seamless-immutable'
import AsyncStorage from '@react-native-community/async-storage'

const transformerConfig = {
  // whitelistPerReducer: {
  //     reducerA: ['keyA', 'keyB']
  // },
  // blacklistPerReducer: {
  //     reducerB: ['keyC', 'keyD']
  // }
}

export const persistConfig = {
  persistEnabled: true,
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
}

