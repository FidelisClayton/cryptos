import React, { Component } from 'react'

import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
  ReferenceLine,
  CartesianGrid
} from 'recharts';

import CustomTooltip from './CustomTooltip'
import { performanceRef } from '../firebase'

const data = [
  { date: '01/01/2018', profit: 20, rentability: 1 },
  { date: '02/01/2018', profit: 18, rentability: 3 },
  { date: '03/01/2018', profit: 21, rentability: 2 },
  { date: '05/01/2018', profit: 29, rentability: 5.2 },
  { date: '06/01/2018', profit: 31, rentability: 10 },
  { date: '06/01/2018', profit: 31, rentability: 10 },
  { date: '04/01/2018', profit: 30, rentability: 6 },
  { date: '06/01/2018', profit: 31, rentability: 10 },
  { date: '06/01/2018', profit: 31, rentability: -8 },
  { date: '06/01/2018', profit: 31, rentability: -5 },
  { date: '06/01/2018', profit: 31, rentability: 10 },
  { date: '07/01/2018', profit: 31, rentability: -2 },
];

const styles ={
  line: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5
  }
}

class History extends Component {
  state = {
    history: []
  }

  componentDidMount () {
    performanceRef().once('value')
      .then(snapshot => snapshot.val())
      .then(performance => Object.values(performance))
      .then(performance => {
        this.setState({
          history: performance
        })
      })
  }

  render () {
    return (
      <LineChart
        width={900}
        height={300}
        data={this.state.history}
        margin={styles.line}
      >
        <Tooltip content={<CustomTooltip />}/>
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{r: 8}}
          dot={false}
        />
        <YAxis dataKey="amount"/>
        <ReferenceLine y={0} stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3"/>
      </LineChart>
    )
  }
}

export default History
