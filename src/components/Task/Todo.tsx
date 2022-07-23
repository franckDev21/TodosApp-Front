import React, { FC, useEffect, useState } from 'react'
import TodoModel from '../../core/model/todo.model'
import { BsCheckLg } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../../core/store/todoList';

import './Todo.scss';

type TypeTodo = {
  todo : TodoModel
}

const Todo:FC<TypeTodo>  = ({ todo }) => {

  const [state,setState] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
    setState(todo.state);
  },[todo.state]);

  const toggleTask = () => {
    if(state === 'TODO'){
      setState('DONE')
    }else{
      setState('TODO')
    }

    // update store
    dispatch(toggleTodo({todo_list_id : todo.todo_list_id,todo_id:todo.id}));
    // update BD
  }

  const deleteMyTodo = () => {
    // update store
    dispatch(deleteTodo({todo_list_id : todo.todo_list_id,todo_id:todo.id}));
    // update BD
  }


  return (
    <div className='todo w-full bg-gray-100 mb-3 px-3 py-2 rounded-md flex items-center justify-between font-semibold'>
      <span className={`${state === 'DONE' ? 'line-through text-green-500':''}`}>{todo.name}</span>
      
      <div className='flex items-center justify-between'>
        <span onClick={deleteMyTodo} className='todo__times w-6 h-6 mr-4 bg-white cursor-pointer rounded-full inline-flex justify-center items-center'>
          <FaTimes className='text-red-400 w-4 h-4' />
        </span>
        <span onClick={toggleTask} className='w-6 h-6 border cursor-pointer bg-white rounded-full inline-flex justify-center items-center'>
          {state === 'DONE' && <BsCheckLg className='text-green-400 w-3 h-3' />}
        </span>
      </div>
      
    </div>
  )
}

export default Todo