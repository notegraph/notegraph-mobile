import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'

import thunk from 'redux-thunk'
import Config from '../config/debugSettings'
// import createSagaMiddleware from 'redux-saga'
import R from 'ramda'
import RehydrationServices from '../services/RehydrationServices'
import ReduxPersist from '../config/reduxPersist'
import { StartupTypes } from './StartupRedux'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

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

  /* ------------- Reactotron Enhancer ------------- */

  // in dev, let's bring **START** with Reactotron's store enhancer
  // if (__DEV__) {
  //   // only bring in Reactotron in dev mode
  //   const createReactotronEnhancer = require('reactotron-redux')

  //   // create it
  //   const reactotronEnhancer = createReactotronEnhancer(console.tron, {
  //     // you can flag some of your actions as important by returning true here
  //     isActionImportant: action =>
  //       action.type === StartupTypes.STARTUP,

  //     // you can flag to completely ignore certain types too... especially the chatty ones
  //     ignore: [...SAGA_LOGGING_BLACKLIST]
  //   })
  //   enhancers.push(reactotronEnhancer)
  // }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  /* ------------- AutoRehydrate Enhancer ------------- */

  const persistEnabled = ReduxPersist.active && !global.__TEST__

  // add the autoRehydrate enhancer
  if (persistEnabled) {
    enhancers.push(autoRehydrate())
  }

  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (persistEnabled) {
    RehydrationServices.updateReducers(store)
  }

  // kick off root saga
  // sagaMiddleware.run(rootSaga)

  return store
}
