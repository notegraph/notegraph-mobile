import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'
import Config from '../config/debugSettings'
// import createSagaMiddleware from 'redux-saga'
import R from 'ramda'
import { persistConfig } from '../config/reduxPersist'
import rootReducer from '../reducers'

// creates the store
export default () => {
  /* ------------- Redux Configuration ------------- */

  const persistEnabled = persistConfig.active && !global.__TEST__

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const middleware = [thunk]
  const enhancers = []

  /* ------------- Saga Middleware ------------- */

  // const sagaMiddleware = createSagaMiddleware()
  // middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */

  const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']
  if (__DEV__ && !global.__TEST__) {
    // the logger master switch
    const USE_LOGGING = Config.reduxLogging
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
    })
    middleware.push(logger)
  }

  enhancers.push(applyMiddleware(...middleware))


  const store = createStore(persistedReducer, compose(...enhancers))
  const persistor = !global.__TEST__ && persistStore(store)

  // kick off root saga
  // sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export const createTestStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk))
}
