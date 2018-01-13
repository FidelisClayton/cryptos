import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CoinCard = ({
  coinId,
  name,
  ammount
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

        <label className="coin-card__label">
          Ammount
        </label>

        <span className="coin-card__amount">
          US$ { ammount }
        </span>
      </div>
    </div>
  )
}

CoinCard.propTypes = {
  coinId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ammount: PropTypes.number.isRequired
}

export default CoinCard
