import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  htmlType,
  icon,
  primary,
  children,
  image,
  small,
  ...props
}) => {
  const classNames = [
    icon || image && 'button__icon',
    primary && 'button__primary',
    small && 'button--small'
  ]
  .filter(className => !!className)
  .join(' ')

  return (
    <button
      type={htmlType}
      className={classNames}
      {...props}
    >
      { image && (
        <img
          src={image}
          className="button__image"
        />
      )}

      { children }
    </button>
  )
}

Button.propTypes = {
  htmlType: PropTypes.string,
  icon: PropTypes.bool,
  primary: PropTypes.bool,
  small: PropTypes.bool,
  children: PropTypes.node,
}

Button.defaultProps = {
  htmlType: 'button'
}

export default Button
