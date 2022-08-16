import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLang } from '../../core/store/traduction';
import AuthService from '../../services/AuthService'

const Header = () => {

  const { token, logout, user } = AuthService();

  const selectRef = useRef(null)
  const dispatch = useDispatch()

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
          <button className='rounded-md active:scale-[97%] bg-gray-100  hover:bg-gray-200 px-3.5 py-1.5 font-semibold text-indigo-500 text-sm' onClick={logoutUser}>Logout</button>
          <select onChange={(e) => {
            dispatch(setLang(e.target.value))
          }} ref={selectRef} className='text-sm text-gray-500 px-4 py-2 rounded-md bg-gray-100 ml-3'>
            <option>Lang</option>
            <option value="fr">fr</option>
            <option value="en">en</option>
          </select>
        </div>
      </div>
    </header>
  )
}

export default Header