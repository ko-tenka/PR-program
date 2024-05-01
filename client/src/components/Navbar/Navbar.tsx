
import React, { useEffect } from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { fetchUserInfo } from '../../redux/thunkActions'
import { useAppDispatch, useAppSelector } from '../../redux/hook';

export default function Navbar() {
  const user = useAppSelector((store) => store.userSlice.user)
  console.log(user)
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(fetchUserInfo());
  }, [dispatch])

  return (
    <div className='navConteiner'>
      {user.login? (
      <>
        <Link className='comp1' to='/'>{user.login}</Link>
        <Link className='comp1' to='/'>logo</Link>
        <Link className='comp1' to='/logout'>Выйти</Link>

      </>):(
      <>
        <Link className='comp1' to='/'>logo</Link>
        <Link className='comp1' to='/reg'>Регистрация</Link>
        <Link className='comp1' to='/login'>Войти</Link>
      </>)}
    </div>
  )
}
