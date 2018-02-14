import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const CustomTooltip = (props) => {
  if (props.active && props.payload) {
    const { payload } = props.payload[0]

    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip__date">{ moment(payload.date).format('MMM DD, YYYY') }</p>
        <p className="custom-tooltip__rentability">
          Your net worth: US$ { payload.amount.toFixed(2) }
        </p>
        <p className="custom-tooltip__rentability">
          Your day profit: US$ { payload.dayProfit.toFixed(2) } ({ payload.dayRentability.toFixed(2) }%)
        </p>
        <p className="custom-tooltip__rentability">
          Your overall profit: US$ { payload.overallProfit.toFixed(2) } ({ payload.overallRentability.toFixed(2) }%)
        </p>
      </div>
    )
  }

  return null
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array
}

export default CustomTooltip
