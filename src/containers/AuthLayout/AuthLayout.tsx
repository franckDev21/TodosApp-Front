import React, { FC, ReactNode } from 'react'
import Header from '../../components/Header/Header'

type TypeAuthLayout = {
  children : ReactNode
}

const AuthLayout: FC<TypeAuthLayout> = ({children}) => {
  
  return (
    <div className="bg-gray-200 overflow-hidden min-h-screen w-full">
      {/* Header */}
      <Header />
      {children}
    </div>
  )
}

export default AuthLayout