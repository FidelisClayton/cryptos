import * as actions from '../actions/history'

const initialState = {
  data: [],
  loading: true,
  error: null,
  loaded: false
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case actions.FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: Object.values(action.payload)
      }

    case actions.FETCH_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default historyReducer
