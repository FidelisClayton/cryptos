import * as actions from '../actions/transactions'

const initialState = {
  data: {},
  loading: true,
  loaded: false,
  error: null
}

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case actions.FETCH_TRANSACTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case actions.FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: null,
        data: action.payload.val()
      }
    default:
      return state
  }
}

export default transactionsReducer
