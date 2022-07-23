import React, { FC } from 'react'
import { BiLoaderAlt } from 'react-icons/bi';
import './Load.scss';

type LoaderType = {
  size ?: number,
  color ?: string
}

const Loader:FC<LoaderType> = ({size,color}) => {
  return (
    <span className='load'><BiLoaderAlt size={size || 40} color={color || '#fff'} /></span>
  )
}

export default Loader