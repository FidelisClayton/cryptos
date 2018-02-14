import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left">
        <span className="copyright">
          © 2018 Cryptus
        </span>
      </div>
      <div className="footer__right">
        <a
          href="https://github.com/FidelisClayton/cryptus"
          target="blank"
        >
          <img
            className="footer__icon"
            src="assets/images/github.svg"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
