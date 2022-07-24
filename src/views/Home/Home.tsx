import React from 'react'
import { Link } from 'react-router-dom'
import GuestLayout from '../../containers/GuestLayout/GuestLayout'

const Home = () => {
  return (
    <GuestLayout>
      <div className='w-full text-center p-24 flex flex-col justify-center items-center'>
        <h1 className='text-6xl font-extrabold text-indigo-600'>Welc<span className=' text-fuchsia-600'>ome</span></h1>
        <p className='text-8xl font-extrabold text-gray-600 mt-5'>👋</p>
        <Link to='/dashboard' className='text-2xl px-4 py-2 bg-indigo-600 font-extrabold text-white rounded-lg mt-10'>Dasboard</Link>
      </div>
    </GuestLayout>
  )
}

export default Home