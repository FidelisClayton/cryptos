import { performanceRef } from '../../firebase'

export const FETCH_HISTORY = 'FETCH_HISTORY'
export const FETCH_HISTORY_REQUEST = `${FETCH_HISTORY}_REQUEST`
export const FETCH_HISTORY_FAIL = `${FETCH_HISTORY}_FAIL`
export const FETCH_HISTORY_SUCCESS = `${FETCH_HISTORY}_SUCCESS`

const fetchHistoryRequest = () => ({
  type: FETCH_HISTORY_REQUEST
})

const fetchHistorySuccess = payload => ({
  type: FETCH_HISTORY_SUCCESS,
  payload
})

const fetchHistoryFail = payload => ({
  type: FETCH_HISTORY_FAIL,
  payload
})

export const fetchHistory = () => dispatch => {
  dispatch(fetchHistoryRequest())

  performanceRef().once('value')
    .then(snapshot => snapshot.val())
    .then(data => {
      if (data) {
        dispatch(fetchHistorySuccess(data))
      } else {
        dispatch(fetchHistoryFail(data))
      }
    })
    .catch(error => {
      dispatch(fetchHistoryFail(error))
    })
}
