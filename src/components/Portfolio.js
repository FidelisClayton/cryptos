import React from 'react'

import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from 'recharts'

const data = [
  { name: 'Bitcoin', value: 2400 },
  { name: 'Ethereum', value: 4567 },
  { name: 'Ripple', value: 1398 },
  { name: 'Dogecoin', value: 9800 },
  { name: 'Litecoin', value: 3908 },
  { name: 'Tron', value: 4800 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                  key={entry.value}
                />
              ))
            }
          </Pie>
          <Tooltip/>
        </PieChart>
      </div>
    </div>
  )
}

export default Portfolio
