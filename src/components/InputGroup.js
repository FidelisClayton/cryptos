import React from 'react'
import PropTypes from 'prop-types'

const InputGroup = ({
  label,
  inputType,
  onChange,
  inputProps,
  children,
  inputSize
}) => {
  const inputClasses = [
    'c-input-group__input',
    inputSize === 'small' && 'c-input-group__input--small'
  ]
    .filter(className => className !== null)
    .join(' ')

  return (
    <div className="c-input-group">
      { label && (
          <label className="c-input-group__label">
            { label }
          </label>
        )
      }

      { children
          ? children
          : (
            <input
              type={inputType}
              className={inputClasses}
              onChange={onChange}
              {...inputProps}
            />
          )
      }
    </div>
  )
}

InputGroup.propTypes = {
  label: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.element,
  inputProps: PropTypes.object,
  inputSize: PropTypes.string
}

export default InputGroup
