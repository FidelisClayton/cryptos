import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CoinCard = ({
  coinId,
  name,
  amount
}) => {
  return (
    <div className="coin-card">
      <div className="coin-card__icon">
        <img
          src={`dist/assets/images/coins/${coinId}.svg`}
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
              <span className="coin-card__percentage--loss">+</span>10%
            </span>
          </div>

          <div className="coin-card__info-item">
            <label className="coin-card__label-mini">
              7D
            </label>

            <span className="coin-card__value">
              <span className="coin-card__percentage--gain">+</span>10%
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

CoinCard.propTypes = {
  coinId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
}

export default CoinCard
