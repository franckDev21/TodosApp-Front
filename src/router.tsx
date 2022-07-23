import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './views/Auth/Auth'
import Dashboard from './views/Dashboard/Dashboard'
import Home from './views/Home/Home'
import NotFound from './views/NotFound/NotFound'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter