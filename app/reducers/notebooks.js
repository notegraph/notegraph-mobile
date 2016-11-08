import R from 'ramda'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import types from '../actions/types'

import defaultState from './defaultState'


const INITIAL_STATE = Immutable(defaultState.notebooks)


const ACTION_HANDLERS = {
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
