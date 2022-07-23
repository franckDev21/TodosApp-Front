import React, { FC, useEffect, useState } from 'react'
import TodoModel from '../../core/model/todo.model'
import { BsCheckLg } from 'react-icons/bs';

type TypeTodo = {
  todo : TodoModel
}

const Todo:FC<TypeTodo>  = ({ todo }) => {

  const [state,setState] = useState('');

  useEffect(()=>{
    setState(todo.state);
  },[todo.state]);

  const toggleTask = () => {
    if(state === 'TODO'){
      setState('DONE')
    }else{
      setState('TODO')
    }
  }

  return (
    <div className='w-full bg-gray-100 mb-3 px-3 py-2 rounded-md flex items-center justify-between font-semibold'>
      <span className={`${state === 'DONE' ? 'line-through text-green-500':''}`}>{todo.name}</span>
      <span onClick={toggleTask} className='w-6 h-6 border cursor-pointer bg-white rounded-full inline-flex justify-center items-center'>
        {state === 'DONE' && <BsCheckLg className='text-green-400 w-3 h-3' />}
      </span>
    </div>
  )
}

export default Todo