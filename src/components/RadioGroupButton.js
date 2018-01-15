import React from 'react'
import PropTypes from 'prop-types'

const RadioGroupButton = ({
  selected,
  children,
  ...props
}) => {
  const classes = [
    'c-radio-group__button',
    selected && 'c-radio-group__button--selected'
  ]
    .filter(className => className !== null)
    .join(' ')

  return (
    <button
      className={classes}
      type="button"
      {...props}
    >
      { children }
    </button>
  )
}

RadioGroupButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
}

export default RadioGroupButton
