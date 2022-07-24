import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';
import TodoList from '../../components/TodoList/TodoList';
import TodoListModel from '../../core/model/todolist.model';
import { addTodoList, fetchStoreTodoList } from '../../core/store/todoList';
import AuthService from '../../services/AuthService'
import TodoService from '../../core/services/todo.service';

const Dashboard = () => {

  const { http,user,token } = AuthService();
  const [loading,setLoading] = useState(true);

  const dispatch = useDispatch();

  const todoLists:TodoListModel[] = useSelector((state:any) => state.todoList);

  async function fetcthTodoList() {
    try {
      setLoading(true);
      const resp = await http.get('api/todos/'+user.id);

      dispatch(fetchStoreTodoList(resp.data.data))

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addNewTodoList = () => {
    const todo_list_id = Date.now();
    
    // update state
    dispatch(addTodoList({user_id: user.id,todo_list_id}));
    // update BD
    TodoService.addTodoList(token,user.id?.toString() || '',todo_list_id.toString())
    .then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  }

  useEffect(() => {
    fetcthTodoList();
  },[]);

  return !loading ? (
    <>
      <div className="container mx-auto pt-10 pb-5">
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold text-indigo-600 '>Dashboard | {todoLists.length} Todo list{todoLists.length > 1 ?'s':''}</h1>

          <button onClick={addNewTodoList} className='px-8 active:scale-[95%] py-2 rounded-md bg-indigo-500'><FaTimes className='transform rotate-[45deg] text-white' size={20} /></button>
        </div>

        {(todoLists.length >= 1) && <div className='block md:flex flex-wrap -mx-4 justify-start items-start'>
          {todoLists.map((todoList: TodoListModel) => <TodoList key={todoList.id} todolist={todoList} />)}
        </div>}

        {(todoLists.length < 1) && <div className='py-10 bg-white rounded-md font-extrabold text-fuchsia-500 w-full text-center text-4xl'>
          No to do list
        </div>}
      </div>
    </>
  ): (
    <div className='w-full p-20 flex justify-center items-center'>
      <Loader size={90} color='#4F46E5' />
    </div>
  )
}

export default Dashboard