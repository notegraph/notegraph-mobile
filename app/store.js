import { createStore, applyMiddleware, compose } from 'redux'
// import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'
import rootReducer from './reducers/index'

// creat the logger
const logger = createLogger({})

let middleware = []
// Don't ship these
if (__DEV__) {
  middleware.push(logger)
}

// a function which can create our store and auto-persist the data
export default () => {
  let store = {}

  const enhancers = compose(
    applyMiddleware(...middleware),
    // Reactotron.storeEnhancer()
  )

  store = createStore(
    rootReducer,
    enhancers
  )

  return store
}
