import Dispatcher from '@helpers/asyncDispatcher'

import { performanceRef } from '../../firebase'

export const FETCH_HISTORY = 'FETCH_HISTORY'
export const FETCH_HISTORY_REQUEST = `${FETCH_HISTORY}_REQUEST`
export const FETCH_HISTORY_FAIL = `${FETCH_HISTORY}_FAIL`
export const FETCH_HISTORY_SUCCESS = `${FETCH_HISTORY}_SUCCESS`

export const fetchHistory = () => dispatch => {
  const dispatcher = new Dispatcher(dispatch)

  dispatcher.handle({
    type: FETCH_HISTORY,
    action: () => performanceRef().once('value')
  })
}
