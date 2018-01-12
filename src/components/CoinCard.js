import React from 'react'

const CoinCard = () => {
  return (
    <div className="coin-card">
      <div className="coin-card__icon">
      </div>

      <div className="coin-card__info">
        <h2 className="coin-card__name">
          Bitcoin
        </h2>

        <label className="coin-card__label">
          Ammount
        </label>

        <span className="coin-card__amount">
          US$ 500
        </span>
      </div>
    </div>
  )
}

export default CoinCard
