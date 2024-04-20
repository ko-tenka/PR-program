import React from 'react'
import { Link } from 'react-router-dom';
// import { useAppSelector } from "../../redux/hook";

export default function Navbar() {
  // const isLogin = useAppSelector((store) => store.persistedReducer.isLogin);
  // const login = useAppSelector((store) => store.persistedReducer.login);
  // console.log(login)
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
