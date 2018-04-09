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
      const data = action.payload.val()

      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: Object.values(data)
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
