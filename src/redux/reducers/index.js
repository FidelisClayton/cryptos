import { combineReducers } from 'redux'

import { portfolio } from './portfolio'
import history from './history'

export default combineReducers({
  portfolio,
  history
})
