import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hook';
import { fetchUserLogout } from '../../redux/thunkActions';


export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      void dispatch(fetchUserLogout())
      navigate('/');
    }, []);

    return null;    
}