import React from 'react'
import AuthService from '../../services/AuthService'

const Header = () => {

  const { token, logout } = AuthService();

  const logoutUser = () => {
    if(token !== undefined){
      logout();
    }
  }

  return (
    <header className='bg-indigo-600 py-4 px-3 text-white text-xl flex justify-between items-center'>
      <h1>TodosAPP</h1>

      <button className='rounded-md active:scale-[97%] bg-white px-3 py-1 text-indigo-500 text-sm' onClick={logoutUser}>Logout</button>
    </header>
  )
}

export default Header