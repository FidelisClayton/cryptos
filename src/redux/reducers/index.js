import { combineReducers } from 'redux'

import { portfolio } from './portfolio'
import history from './history'
import transactions from './transactions.js'

export default combineReducers({
  portfolio,
  history,
  transactions
})
