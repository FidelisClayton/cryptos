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
      .then(snapshot => snapshot.val() || {})
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
          dataKey="overallRentability"
          stroke="#8884d8"
          activeDot={{r: 8}}
          dot={false}
        />
        <YAxis unit="%" dataKey="overallRentability"/>
        <ReferenceLine y={0} stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3"/>
      </LineChart>
    )
  }
}

export default History
