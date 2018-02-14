import {
  PORTFOLIO_REQUEST,
  PORTFOLIO_FAIL,
  PORTFOLIO_SUCCESS
} from '../actions/portfolio'

const initialData = {
  loading: false,
  error: false,
  data: []
}

export const portfolio = (state = initialData, action) => {
  switch (action.type) {
    case PORTFOLIO_REQUEST:
      return {
        ...state,
        loading: true
      }

      break;

    case PORTFOLIO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: Object.entries(action.data)
      }

      break;

    case PORTFOLIO_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }

    default:
      return state
  }
}
