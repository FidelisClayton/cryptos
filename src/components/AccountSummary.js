import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl'

import { accountSummary } from '../firebase'

class AccountSummary extends Component {
  state = {
    amount: 0,
    overallProfit: 0,
    overallRentability: 0,
    dayRentability: 0
  }

  componentDidMount () {
    console.log("component did mount")
    accountSummary().once('value')
      .then(snapshot => snapshot.val() || {})
      .then(summary => {
        const values = Object.values(summary)

        if (values.length > 0) {
          this.setState({ ...values[0] })
        }
      })
      .catch(console.log)
  }

  render () {
    return (
      <section className="account-summary">
        <div className="account-summary__main-values">
          <div className="account-summary__amount-wrapper">
            <label className="account-summary__title">
              Net Worth
            </label>

            <h3 className="account-summary__value">
              <FormattedNumber
                value={this.state.amount}
                style="currency"
                minimumFractionDigits={2}
                currency="USD"
              />
            </h3>
          </div>

          <div className="account-summary__profit-wrapper">
            <label className="account-summary__title">
              Profit
            </label>

            <h3 className="account-summary__value">
              { this.state.overallProfit === 0 && (
                  <span>
                    <FormattedNumber
                      value={this.state.overallProfit}
                      style="currency"
                      minimumFractionDigits={2}
                      currency="USD"
                    />
                  </span>
                )
              }
              { this.state.overallProfit > 0 && (
                  <span>
                    <span className="account-summary__value--positive">+</span>
                    <FormattedNumber
                      value={this.state.overallProfit}
                      style="currency"
                      minimumFractionDigits={2}
                      currency="USD"
                    />
                  </span>
                )
              }
              { this.state.overallProfit < 0 && (
                  <span>
                    <span className="account-summary__value--negative">-</span>
                    <FormattedNumber
                      value={this.state.overallProfit * -1}
                      style="currency"
                      minimumFractionDigits={2}
                      currency="USD"
                    />
                  </span>
                )
              }
            </h3>
          </div>
        </div>

        <div className="account-summary__secondary-values">
          <div className="account-summary__inline-data">
            <label className="account-summary__inline-label">
              Rentability:
            </label>
            <span className="account-summary__inline-value">
              { this.state.overallRentability === 0 && (
                  <span>
                    <span className="account-summary__value--positive">+</span>
                    {this.state.overallRentability.toFixed(2) }%
                  </span>
                )
              }
              { this.state.overallRentability > 0 && (
                  <span>
                    <span className="account-summary__value--positive">+</span>
                    {this.state.overallRentability.toFixed(2) }%
                  </span>
                )
              }
              { this.state.overallRentability < 0 && (
                  <span>
                    <span className="account-summary__value--negative">-</span>
                    {(this.state.overallRentability * -1).toFixed(2) }%
                  </span>
                )
              }
            </span>
          </div>

          <div className="account-summary__inline-data">
            <label className="account-summary__inline-label">
              24h variation:
            </label>
            <span className="account-summary__inline-value">
              { this.state.dayRentability === 0 && (
                  <span>
                    <span className="account-summary__value--positive">+</span>
                    {this.state.dayRentability.toFixed(2) }%
                  </span>
                )
              }
              { this.state.dayRentability > 0 && (
                  <span>
                    <span className="account-summary__value--positive">+</span>
                    {this.state.dayRentability.toFixed(2) }%
                  </span>
                )
              }
              { this.state.dayRentability < 0 && (
                  <span>
                    <span className="account-summary__value--negative">-</span>
                    {(this.state.dayRentability * -1).toFixed(2) }%
                  </span>
                )
              }
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
}

export default AccountSummary
