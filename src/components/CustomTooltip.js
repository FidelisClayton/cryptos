import React from 'react'
import PropTypes from 'prop-types'

const CustomTooltip = (props) => {
  if (props.active) {
    const { payload } = props.payload[0]

    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip__date">{ payload.date }</p>
        <p className="custom-tooltip__rentability">Your net worth: US$ { payload.amount }</p>
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
