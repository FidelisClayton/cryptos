import Dispatcher from '@helpers/asyncDispatcher'

import { transactionsRef } from '../../firebase'

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS'
export const FETCH_TRANSACTIONS_REQUEST = `${FETCH_TRANSACTIONS}_REQUEST`
export const FETCH_TRANSACTIONS_SUCCESS = `${FETCH_TRANSACTIONS}_SUCCESS`
export const FETCH_TRANSACTIONS_FAIL = `${FETCH_TRANSACTIONS}_FAIL`

export const fetchTransactions = () => dispatch => {
  const dispatcher = new Dispatcher(dispatch)

  dispatcher.handle({
    type: FETCH_TRANSACTIONS,
    action: () => transactionsRef().once('value')
  })
}
