import React, { FC, ReactNode } from 'react'

type TypeGuestLayout = {
  children : ReactNode
}

const GuestLayout: FC<TypeGuestLayout> = ({children}) => {
  return (
    <div className='bg-gray-100 min-h-screen w-full overflow-hidden'>
      {children}
    </div>
  )
}

export default GuestLayout