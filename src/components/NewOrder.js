import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';

import InputGroup from './InputGroup'
import RadioGroupButton from './RadioGroupButton'

import { getCoinData } from '../api'
import {
  transactionsRef,
  getUserUid
} from '../firebase'

import { removeEmptyFields } from '../utils'
import { buildPortfolio } from '../api'

const ORDER_TYPE_BUY = 'BUY'
const ORDER_TYPE_SELL = 'SELL'

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = ({
  name,
  symbol
}) => (
  <div>
    { name } ({ symbol })
  </div>
)

const coinRegex = suggestion => new RegExp(suggestion, "gi")

export default class NewOrder extends Component {
  constructor () {
    super()

    this.state = {
      form: {
        coin: '',
        date: moment(),
        type: ORDER_TYPE_BUY
      },
      suggestions: [],
      coins: []
    }
  }

  componentDidMount () {
    getCoinData()
      .then(data => this.setState({
        coins: data
      }))
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? [] : this.state.coins.filter(coin => {
      return coinRegex(inputValue).test(coin.name) || coinRegex(inputValue).test(coin.symbol)
    })
  }

  onCoinChange = (event, { newValue }) => {
    this.setState({
      form: {
        ...this.state.form,
        coin: newValue
      }
    })
  }

  onInputChange = (inputName) => {
    return (event) => {
      this.setState({
        form: {
          ...this.state.form,
          [inputName]: event.target.value
        }
      })
    }
  }

  onDatePickerChange = (date) => {
    this.setState({
      form: {
        ...this.state.form,
        date: date
      }
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value).slice(0, 10)
    })
  }

  onSuggestionsClearRequested = (data) => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      form: {
        ...this.state.form,
        crypto: suggestion,
        coin: suggestion.name
      }
    })
  }

  handleRadioClick = (orderType) => {
    this.setState({
      form: {
        ...this.state.form,
        type: orderType
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { form } = this.state

    transactionsRef().push(removeEmptyFields({
      coin: form.crypto,
      priceUSD: form.priceUSD,
      priceBTC: form.priceBTC,
      priceETH: form.priceETH,
      purchaseDate: form.date.toISOString(),
      amount: form.amount,
      type: form.type,
    }), error => {
      if (!error) {
        buildPortfolio(getUserUid())
      } else {
        console.log(error)
      }
    })
  }

  render () {
    const {
      suggestions,
      form
    } = this.state

    const value = form.coin

    const inputProps = {
      value,
      onChange: this.onCoinChange
    }

    return (
      <div className="new-order">
        <h2 className="heading u-text-center">Add a new coin transaction</h2>
        <h3 className="heading-description u-text-center">Fill the form to add a new coin transaction</h3>

        <form
          className="new-order__form"
          onSubmit={this.handleSubmit}
        >
          <InputGroup
            label="Buy or sell?"
          >
            <div className="c-radio-group">
              <RadioGroupButton
                selected={this.state.form.type === ORDER_TYPE_BUY}
                onClick={() => this.handleRadioClick(ORDER_TYPE_BUY)}
              >
                Buy
              </RadioGroupButton>
              <RadioGroupButton
                selected={this.state.form.type === ORDER_TYPE_SELL}
                onClick={() => this.handleRadioClick(ORDER_TYPE_SELL)}
              >
                Sell
              </RadioGroupButton>
            </div>
          </InputGroup>

          <InputGroup
            label="Coin"
          >
            <Autosuggest
              className="c-input-group__input"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </InputGroup>

          <InputGroup
            label="Amount of coins"
            inputType="number"
            onChange={this.onInputChange('amount')}
            inputProps={{
              step: "any",
              required: "true"
            }}
          />

          <InputGroup
            label="Price per coin (USD)"
            inputType="number"
            onChange={this.onInputChange('priceUSD')}
            inputProps={{
              step: "any",
              required: "true"
            }}
          />

          <InputGroup
            label="Price per coin (BTC)"
            inputType="number"
            onChange={this.onInputChange('priceBTC')}
            inputProps={{ step: "any" }}
          />

          <InputGroup
            label="Price per coin (ETH)"
            inputType="number"
            onChange={this.onInputChange('priceETH')}
            inputProps={{ step: "any" }}
          />

          <InputGroup
            label="Date"
          >
            <DatePicker
              selected={this.state.form.date}
              onChange={this.onDatePickerChange}
              dateFormat='DD/MM/YYYY'
            />
          </InputGroup>

          <div className="c-submit-wrapper">
            <button
              type="submit"
              className="button__primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
