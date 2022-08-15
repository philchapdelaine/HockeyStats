import React from 'react'
import '../App.css'
import canadiensLogo from '../resources/canadiens.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='canadiens-logo' src={canadiensLogo} alt="logo" />
    </div>
  )
}

export default Navbar