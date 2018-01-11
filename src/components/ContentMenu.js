import React from 'react'

const ContentMenu = () => {
  return (
    <nav className="content-menu">
      <ul className="content-menu__nav">
        <li className="content-menu__item content-menu__item--active">
          <a
            className="content-menu__link"
            href="#"
          >
            Portfolio
          </a>
        </li>

        <li className="content-menu__item">
          <a
            className="content-menu__link"
            href="#"
          >
            History
          </a>
        </li>

        <li className="content-menu__item">
          <a
            className="content-menu__link"
            href="#"
          >
            Market
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default ContentMenu
