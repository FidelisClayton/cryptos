import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { FormattedNumber } from 'react-intl'

import { fetchTransactions } from '@redux/actions/transactions'

class Transactions extends Component {
  componentDidMount() {
    this.props.fetchTransactions()
  }

  renderTransactions (transactions) {
    return Object.entries(transactions).map(([ key, transaction ]) => (
      <tr
        className="table__row"
        key={key}
      >
        <td className="table__data">{ transaction.coin.name } ({ transaction.coin.symbol})</td>
        <td className="table__data">{ transaction.type }</td>
        <td className="table__data u-text-center">
          <FormattedNumber
            value={transaction.priceUSD}
            style="currency"
            currency="USD"
            minimumFractionDigits={2}
          />
        </td>
        <td className="table__data u-text-center">
          { transaction.priceBTC
              ? (
                <FormattedNumber
                  value={transaction.priceBTC}
                  style="currency"
                  minimumFractionDigits={8}
                />
              )
              : '-'
          }
        </td>
        <td className="table__data u-text-center">
          { transaction.priceETH
              ? (
                <FormattedNumber
                  value={transaction.priceETH}
                  style="currency"
                  minimumFractionDigits={8}
                />
              )
              : '-'
          }
        </td>
        <td className="table__data u-text-center">
          { transaction.amount }
        </td>
        <td className="table__data u-text-center">
          <FormattedNumber
            value={transaction.amount * transaction.priceUSD}
            style="currency"
            minimumFractionDigits={2}
            currency="USD"
          />
        </td>
        <td className="table__data u-text-center">
          { moment(transaction.purchaseDate).format('DD/MM/YYYY') }
        </td>
      </tr>
    ))
  }

  render () {
    return (
      <div className="transactions table__responsive-wrapper">
        { this.props.loading && !this.props.loaded && (
          <div className="loading">Loading</div>
        )}

        { !this.props.loading && this.props.error && !this.props.loaded && (
          <div className="error">Error</div>
        )}

        { this.props.loaded && (
          <table className="table">
            <thead>
              <tr>
                <th className="table__head">
                  Coin
                </th>
                <th className="table__head">
                  Type
                </th>
                <th className="table__head u-text-center">
                  Price <br /> <small className="table__small">(USD)</small>
                </th>
                <th className="table__head u-text-center">
                  Price <br /> <small className="table__small">(BTC)</small>
                </th>
                <th className="table__head u-text-center">
                  Price <br /> <small className="table__small">(ETH)</small>
                </th>
                <th className="table__head u-text-center">
                  Amount
                </th>
                <th className="table__head u-text-center">
                  Total
                </th>
                <th className="table__head u-text-center">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              { this.renderTransactions(this.props.data) }
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.transactions
  }), {
    fetchTransactions
  }
)(Transactions)
