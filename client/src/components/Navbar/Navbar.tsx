
import React, { useEffect } from 'react';
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
    <div>
      <p>{user.login}</p>
      <Link to='/'>logo</Link>
      <div>
        <Link to='reg'>Регистрация</Link>
        <Link to='login'>Войти</Link>
      </div>
    </div>
  )
}
