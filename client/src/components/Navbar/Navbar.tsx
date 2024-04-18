import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <Link to='/'>logo</Link>
      <div>
        <Link to='reg'>Регистрация</Link>
        <Link to='login'>Войти</Link>
      </div>
    </div>
  )
}
