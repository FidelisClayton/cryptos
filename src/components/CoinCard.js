import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
  storage,
  coinsRef,
} from '../firebase'
import { askImage } from '../api'

const onImageError = coinId => {
  askImage(coinId)
}

export default class CoinCard extends Component {
  constructor () {
    super()

    this.state = {
      image: 'dist/assets/images/spin.svg'
    }
  }

  componentDidMount () {
    coinsRef.child(`${this.props.coinId}.svg`).getDownloadURL()
      .then(url => {
        this.setState({ image: url })
      })
      .catch(error => {
        onImageError(this.props.coinId)

        this.setState({ image: 'dist/assets/images/default.svg' })
      })
  }

  render () {
    const {
      coinId,
      name,
      amount,
      day,
      week,
      hour
    } = this.props

    return (
      <div className="coin-card">
        <div className="coin-card__icon">
          <img
            src={this.state.image}
            className="coin-card__image"
          />
        </div>

        <div className="coin-card__info">
          <h2 className="coin-card__name">
            <Link
              className="coin-card__link"
              to={`/coin/${coinId}`}
            >
              { name }
            </Link>
          </h2>

          <div className="coin-card__additional-info">
            <div className="coin-card__info-item">
              <label className="coin-card__label-mini">
                24H
              </label>

              <span className="coin-card__value">
                { day > 0
                    ? (
                      <span><span className="coin-card__percentage--gain">+</span>{ day }%</span>
                    )
                    : (
                      <span><span className="coin-card__percentage--loss">-</span>{ day * -1 }%</span>
                    )
                }
              </span>
            </div>

            <div className="coin-card__info-item">
              <label className="coin-card__label-mini">
                7D
              </label>

              <span className="coin-card__value">
                { week > 0
                    ? (
                      <span><span className="coin-card__percentage--gain">+</span>{ week }%</span>
                    )
                    : (
                      <span><span className="coin-card__percentage--loss">-</span>{ week * -1 }%</span>
                    )
                }
              </span>
            </div>
          </div>

          <div className="coin-card__additional-info">
            <div className="coin-card__info-item">
              <label className="coin-card__label-mini">
                Gains
              </label>

              <span className="coin-card__value">
                <span className="coin-card__percentage--loss">+</span>10%
              </span>
            </div>

            <div className="coin-card__info-item">
              <label className="coin-card__label-mini">
                Profit
              </label>

              <span className="coin-card__value">
                <span className="coin-card__percentage--gain">+</span>$20
              </span>
            </div>
          </div>

          <label className="coin-card__label">
            Ammount
          </label>

          <span className="coin-card__amount">
            US$ { amount }
          </span>
        </div>
      </div>
    )
  }
}

CoinCard.propTypes = {
  coinId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}
