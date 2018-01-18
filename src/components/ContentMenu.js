import React from 'react'

import MenuItem from './MenuItem'

const ContentMenu = () => {
  const currentRoute = window.location.hash.replace('#', '')

  return (
    <nav className="content-menu">
      <ul className="content-menu__nav">
        <MenuItem
          label="Portfolio"
          active={currentRoute === '/portfolio'}
          route="/portfolio"
        />

        <MenuItem
          label="History"
          active={currentRoute === '/history'}
          route="/history"
        />

        <MenuItem
          label="Market"
          active={currentRoute === '/market'}
          route="/order"
        />

        <MenuItem
          label="Transactions"
          active={currentRoute === '/transactions'}
          route="/transactions"
        />
      </ul>
    </nav>
  )
}

export default ContentMenu
