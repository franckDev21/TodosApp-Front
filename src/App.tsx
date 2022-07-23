import React from 'react';
import './App.scss';
import AuthLayout from './containers/AuthLayout/AuthLayout';
import GuestLayout from './containers/GuestLayout/GuestLayout';
import AppRouter from './router';
import AuthService from './services/AuthService';
import Auth from './views/Auth/Auth';


function App() {

  const { getToken } = AuthService();

  if(!getToken()){
    return <GuestLayout children={<Auth />} />
  }

  return <AuthLayout children={<AppRouter />} />

}

export default App;
