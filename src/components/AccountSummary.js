import React from 'react'

const AccountSummary = () => {
  return (
    <section className="account-summary">
      <div className="account-summary__main-values">
        <div className="account-summary__amount-wrapper">
          <label className="account-summary__title">
            Ammount
          </label>

          <h3 className="account-summary__value">
            USD 1,500.00
          </h3>
        </div>

        <div className="account-summary__profit-wrapper">
          <label className="account-summary__title">
            Profit
          </label>

          <h3 className="account-summary__value">
            <span className="account-summary__value--positive">+</span>USD 53.00
          </h3>
        </div>
      </div>

      <div className="account-summary__secondary-values">
        <div className="account-summary__inline-data">
          <label className="account-summary__inline-label">
            Rentability:
          </label>
          <span className="account-summary__inline-value">
            <span className="account-summary__value--positive">+</span>8%
          </span>
        </div>

        <div className="account-summary__inline-data">
          <label className="account-summary__inline-label">
            24h variation:
          </label>
          <span className="account-summary__inline-value">
            <span className="account-summary__value--positive">+</span>8%
          </span>
        </div>

        <div className="account-summary__inline-data">
          <div className="account-summary__last-update">
            Updated today at 16:20
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSummary
