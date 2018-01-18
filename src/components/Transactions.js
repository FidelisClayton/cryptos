import React, { Component } from 'react'
import moment from 'moment'

import {
  FormattedNumber,
  FormattedDate
} from 'react-intl'

import { transactionsRef } from '../firebase'

export default class Transactions extends Component {
  constructor () {
    super()

    this.state = {
      transactions: {}
    }
  }

  componentDidMount () {
    transactionsRef().on('value', snapshot => {
      this.setState({ transactions: snapshot.val() })
    })
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
          { moment(transaction.purchaseDate).format('hh:mm on DD/MM/YYYY') }
        </td>
      </tr>
    ))
  }

  render () {
    return (
      <div className="transactions">
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
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            { this.renderTransactions(this.state.transactions) }
          </tbody>
        </table>
      </div>
    )
  }
}
