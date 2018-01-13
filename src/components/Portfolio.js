import React from 'react'

import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from 'recharts'

import CoinCard from './CoinCard'

const data = [
  { name: 'Bitcoin', value: 2400 },
  { name: 'Ethereum', value: 4567 },
  { name: 'Ripple', value: 1398 },
  { name: 'Dogecoin', value: 9800 },
  { name: 'Litecoin', value: 3908 },
  { name: 'Tron', value: 4800 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const coins = [
  {
    coinId: 'bitcoin',
    name: 'Bitcoin',
    ammount: 500
  },
  {
    coinId: 'ethereum',
    name: 'Ethereum',
    ammount: 200
  },
  {
    coinId: 'substratum',
    name: 'Substratum',
    ammount: 300
  },
  {
    coinId: 'tron',
    name: 'Tron',
    ammount: 120
  },
  {
    coinId: 'red-plus',
    name: 'Red Pulse',
    ammount: 10
  }
]

const Portfolio = () => {
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

      <div className="portfolio__coin-cards">
        { coins.map(coin => (
            <CoinCard
              key={coin.coinId}
              {...coin}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Portfolio
