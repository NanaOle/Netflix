import React, { useEffect, useState } from 'react'
import img1 from './images/netfilx.png'
import img2 from './images/face.png'
import './Nav.css'

function Nav() {
  const [show, handleShow] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true)
      } else {
        handleShow(false)
      }
      return () => {
        window.removeEventListener('scroll')
      }
    })
  }, [])

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <img className="nav_logo" src={img1} alt="Netflix Logo" />
      <img className="nav_avatar" src={img2} alt="Netflix Logo " />
    </div>
  )
}

export default Nav
