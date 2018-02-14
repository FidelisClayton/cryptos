import {
  portfolioRef,
  getUserUid
} from '../firebase'

import * as api from '../api'

export const PORTFOLIO_REQUEST = 'PORTFOLIO/REQUEST'
export const PORTFOLIO_FAIL = 'PORTFOLIO/FAIL'
export const PORTFOLIO_SUCCESS = 'PORTFOLIO/SUCCESS'

export const BUILD_PORTFOLIO_REQUEST = 'BUILD_PORTFOLIO/REQUEST'
export const BUILD_PORTFOLIO_FAIL = 'BUILD_PORTFOLIO/FAIL'
export const BUILD_PORTFOLIO_SUCCESS = 'BUILD_PORTFOLIO/SUCCESS'

export const getPortfolio = () => dispatch => {
  dispatch(getPorfolioLoading())

  return portfolioRef().once('value')
    .then(snapshot => snapshot.val())
    .then(portfolio => {
      dispatch(getPortfolioSuccess(portfolio))
    })
}

const getPortfolioSuccess = portfolio => ({
  type: PORTFOLIO_SUCCESS,
  data: portfolio
})

const getPorfolioLoading = () => ({
  type: PORTFOLIO_REQUEST
})

export const buildPortfolio = () => dispatch => {
  dispatch(buildPortfolioLoading())

  api.buildPortfolio(getUserUid())
    .then(buildPortfolioSuccess)
    .catch(buildPortfolioError)
}

const buildPortfolioLoading = () => ({
  type: BUILD_PORTFOLIO_REQUEST
})

const buildPortfolioSuccess = () => ({
  type: BUILD_PORTFOLIO_SUCCESS
})

const buildPortfolioError = () => ({
  type: BUILD_PORTFOLIO_FAIL
})
