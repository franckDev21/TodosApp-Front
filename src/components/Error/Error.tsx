import React, { FC } from 'react'

type ErrorType = {
  message : string
}

const Error: FC<ErrorType> = ({ message }) => {
  return (
    <div className="py-3 mb-2 text-center bg-red-200 text-red-500 font-semibold rounded-md w-full">
      { message }
    </div>
  )
}

export default Error