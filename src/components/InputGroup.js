import React from 'react'
import PropTypes from 'prop-types'

const InputGroup = ({
  label,
  inputType,
  onChange,
  inputProps,
  children
}) => {
  return (
    <div className="c-input-group">
      <label className="c-input-group__label">
        { label }
      </label>

      { children
          ? children
          : (
            <input
              type={inputType}
              className="c-input-group__input"
              onChange={onChange}
              {...inputProps}
            />
          )
      }
    </div>
  )
}

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.element,
  inputProps: PropTypes.object
}

export default InputGroup
