import React, { FC, useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import TodoListModel from '../../core/model/todolist.model'
import TodoService from '../../core/services/todo.service'
import { addTodo, deleteTodoList } from '../../core/store/todoList'
import AuthService from '../../services/AuthService'
import Todo from '../Task/Todo'

import './TodoList.scss';

type TypeTodoList = {
  todolist : TodoListModel
} 

const TodoList:FC<TypeTodoList> = ({todolist}) => {

  const {token} = AuthService();

  const [newTodo,setNewTodo] = useState<string>('');
  const dispatch = useDispatch();

  const addNewTodo = (id: string,value: string) => {
    setNewTodo('');
    // update store
    dispatch(addTodo({id,value}));
    // update BD
    TodoService.addTodo(token,value,(todolist.id?.toString() || ''))
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err));
  }

  const deleteMyTodoList = () => {
    // update store
    dispatch(deleteTodoList(todolist.id));
    // update BD
    TodoService.deleteTodoList(token,(todolist.id?.toString() || ''))
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err));
  }

  return (
    <div className="todo-list w-full mb-4 lg:mb-4 lg:w-1/3 px-4">
      <div className="bg-white pt-14 pb-5 px-4 rounded-xl flex flex-col items-center overflow-hidden relative">
        
        <div className="todo-list__tiket flex items-center justify-between text-center absolute top-0 right-0 rounded-bl-xl px-6 bg-fuchsia-200 py-2">
          <span className="date font-bold text-blue-900">{todolist.created_at}</span>
          <span onClick={deleteMyTodoList} className='toggle-btn cursor-pointer '><IoMdTrash className='text-fuchsia-600 w-5 h-5' /></span>
        </div>

        <div className="flex flex-col text-center absolute top-0 left-0 px-6  py-2">
          <span className="font-bold text-blue-900">{(todolist?.todos || []).length} Task{(todolist?.todos || []).length > 1 ? 's':''}</span>
        </div>

        <form className='w-full' onSubmit={(e) => {
          e.preventDefault();
          addNewTodo((todolist?.id?.toString()||''),newTodo);
        }}>
          <input onChange={e => setNewTodo(e.target.value)} value={newTodo} placeholder='New todo' className='px-3 py-2 outline-none border mb-3 font-semibold w-full rounded-md' />
        </form>

        {(todolist?.todos || []).length >= 1 ? 
          <>
            {(todolist?.todos || []).map(todo => <Todo todo={todo} key={todo.id} />)}
          </>
          :
          <>
            <div className="px-3 py-2 mb-3 bg-red-100 text-center font-semibold w-full rounded-md">No task to do</div>
          </>
        }
        
        <button onClick={() => addNewTodo((todolist?.id?.toString()||''),newTodo)} className={`${newTodo === '' ? 'disabled':''} text-white px-3 py-2 bg-indigo-500 text-center font-semibold w-full rounded-md`}>Add todo </button>
      </div>
    </div>
  )
}

export default TodoList