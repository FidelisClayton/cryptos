import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';

import InputGroup from './InputGroup'

const languages = [
  {
    name: 'Bitcoin',
    price: 123123
  },
  {
    name: 'Bitcoin Cash',
    year: 2012
  },
  {
    name: 'Ethereum',
    year: 2012
  },
  {
    name: 'Tron',
    year: 2012
  },
]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

export default class NewOrder extends Component {
  constructor () {
    super()

    this.state = {
      form: {
        coin: '',
        startDate: moment()
      },
      suggestions: []
    }
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
        startDate: date
      }
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
            label="Coin"
          >
            <Autosuggest
              className="c-input-group__input"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
              selected={this.state.form.startDate}
              onChange={this.onDatePickerChange}
            />
          </InputGroup>

          <div className="c-submit-wrapper">
            <button
              type="submit"
              className="button--primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
