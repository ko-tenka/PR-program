import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import "./App.css";
import MainPage from './pages/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import RegPage from './pages/RegPage/RegPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App(): JSX.Element {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='reg' element={<RegPage/>}/>
      </Routes>

    </>
  );
}

export default App;
