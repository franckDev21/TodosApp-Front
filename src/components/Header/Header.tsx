import React from 'react'
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService'

const Header = () => {

  const { token, logout, user } = AuthService();

  const logoutUser = () => {
    if(token !== undefined){
      logout();
    }
  }

  return (
    <header className='bg-white py-4 text-xl'>
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className=' font-[900] text-3xl text-gray-600'>
          <span className='text-fuchsia-600'>TODO</span><span>.</span><span>APP</span>
        </Link>

        <div className='flex items-center justify-between'>
          <div className='text-xs hidden md:flex flex-col mr-3 text-gray-600'>
            <span className='font-semibold'>{user.name}</span>
            <span>{user.email}</span>
          </div>
          <button className='rounded-md active:scale-[97%] bg-gray-100 shadow hover:bg-gray-200 px-3.5 py-1.5 font-semibold text-indigo-500 text-sm' onClick={logoutUser}>Logout</button>
        </div>
      </div>
    </header>
  )
}

export default Header