import React from 'react'

import { auth } from '../firebase'

const Header = props => {
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
            { props.user &&
              <li className="header__nav-item">{ props.user.displayName }</li>
            }
            <li className="header__nav-item">
              <button
                className="button__primary"
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
