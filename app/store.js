import configureStore from './redux/createStore'
import rootReducer from './reducers/index'

// a function which can create our store and auto-persist the data
export default () => {

  return configureStore(
    rootReducer,
    //rootSaga
  )
}
