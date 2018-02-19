import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Form, Text } from 'react-form'

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
      coins: [],
      success: false
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

  handleSubmit = (values, event, form) => {
    const isValid = Object.keys(form.errors).length === 0

    if (isValid) {
      return transactionsRef().push(removeEmptyFields({
        coin: form.crypto,
        purchaseDate: this.state.form.date.toISOString(),
        type: this.state.form.type,
        ...values
      }))
      .then(form.resetAll)
      .then(buildPortfolio(getUserUid()))
      .then(() => {
        this.setState({ success: true })
      })
      .catch(console.log)
    } else {
      console.log(form.errors)
    }
  }

  handleSubmitFailure = console.log

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

        <Form
          onSubmit={this.handleSubmit}
          onSubmitFailure={this.handleSubmitFailure}
        >
          { formApi => (
            <form
              className="new-order__form"
              onSubmit={formApi.submitForm}
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
              >
                <Text
                  className="c-input-group__input"
                  type="number"
                  field="amount"
                />
              </InputGroup>

              <InputGroup
                label="Price per coin (USD)"
                inputType="number"
                onChange={this.onInputChange('priceUSD')}
              >
                <Text
                  className="c-input-group__input"
                  type="number"
                  field="priceUSD"
                />
              </InputGroup>

              <InputGroup
                label="Price per coin (BTC)"
                inputType="number"
                onChange={this.onInputChange('priceBTC')}
                inputProps={{ step: "any" }}
              >
                <Text
                  className="c-input-group__input"
                  type="number"
                  field="priceBTC"
                />
              </InputGroup>

              <InputGroup
                label="Price per coin (ETH)"
                inputType="number"
                onChange={this.onInputChange('priceETH')}
                inputProps={{ step: "any" }}
              >
                <Text
                  className="c-input-group__input"
                  type="number"
                  field="priceETH"
                />
              </InputGroup>

              <InputGroup
                label="Date"
              >
                <DatePicker
                  selected={this.state.form.date}
                  onChange={this.onDatePickerChange}
                  dateFormat='DD/MM/YYYY'
                />
              </InputGroup>

              <div className="c-message--success">
                Transaction successfully created
              </div>

              <div className="c-submit-wrapper">
                <button
                  type="submit"
                  className="button__primary"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    )
  }
}
