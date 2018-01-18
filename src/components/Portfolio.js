import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from 'recharts'

import CoinCard from './CoinCard'

import { portfolioRef } from '../firebase'

const data = [
  { name: 'Bitcoin', value: 2400 },
  { name: 'Ethereum', value: 4567 },
  { name: 'Ripple', value: 1398 },
  { name: 'Dogecoin', value: 9800 },
  { name: 'Litecoin', value: 3908 },
  { name: 'Tron', value: 4800 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Portfolio extends Component {
  constructor () {
    super()

    this.state = {
      portfolio: {}
    }
  }

  componentDidMount () {
    portfolioRef().on('value', snapshot => {
      this.setState({
        portfolio: snapshot.val() || {}
      })
    })
  }

  render () {
    const { portfolio } = this.state

    return (
      <div className="portfolio">
        <div className="portfolio__chart-wrapper">
          <PieChart
            width={600}
            height={400}
          >
            <Pie
              data={data}
              dataKey="value"
              outerRadius={150}
              fill="#82ca9d"
            >
              { data.map((entry, index) => (
                  <Cell
                    fill={COLORS[index % COLORS.length]}
                    key={`${entry.value}-${index}`}
                  />
                ))
              }
            </Pie>
            <Tooltip/>
          </PieChart>
        </div>

        <div className="portfolio__section-header">
          <h2 className="portfolio__title">
            Your Coins <span className="portfolio__dropdown">card view</span>
          </h2>
          <Link
            className="portfolio__primary-button"
            to={'/home/new-order'}
          >
            Add new coin
          </Link>
        </div>

        <div className="portfolio__coin-cards">
          { Object.entries(portfolio).map(([ key, data ]) => (
              <CoinCard
                key={key}
                {...data}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
