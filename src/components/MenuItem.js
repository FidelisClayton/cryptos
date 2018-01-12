import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const MenuItem = ({
  label,
  active,
  route
}) => {
  const classes = [
    'content-menu__item',
    active && 'content-menu__item--active'
  ]
    .filter(className => className !== null)
    .join(' ')

  return (
    <Link
      className="content-menu__link"
      to={route}
    >
      <li className={classes}>
        { label }
      </li>
    </Link>
  )
}

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  route: PropTypes.string.isRequired
}

export default MenuItem
