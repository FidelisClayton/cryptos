import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
  ReferenceLine,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'

import CustomTooltip from '../components/CustomTooltip'
import { fetchHistory } from '../redux/actions/history'

const styles ={
  line: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5
  }
}

class History extends Component {
  componentDidMount () {
    this.props.fetchHistory()
  }

  render () {
    return (
      <div className="history">
        { this.props.loading && !this.props.loaded && (
          <div className="loading">Loading</div>
        )}

        { !this.props.loading && this.props.error && (
          <div className="error">Error</div>
        )}

        { this.props.loaded && (
          <ResponsiveContainer>
            <LineChart
              width={900}
              height={300}
              data={this.props.data}
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
          </ResponsiveContainer>
        )}
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      ...state.history
    }
  }, {
    fetchHistory
  }
)(History)
