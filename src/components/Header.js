import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="header__navigation">
        <div className="header__left">
          <div className="header__logo-wrapper">
            <h2 className="header__logo">Crypto</h2>
          </div>
        </div>
        <div className="header__right">
          <ul className="header__nav">
            <li className="header__nav-item">Clayton Fidelis</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
