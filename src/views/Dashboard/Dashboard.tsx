import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import TodoList from '../../components/TodoList/TodoList';
import TodoListModel from '../../core/model/todolist.model';
import { fetchStoreTodoList } from '../../core/store/todoList';
import AuthService from '../../services/AuthService'

const Dashboard = () => {

  const { http,user } = AuthService();
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

  useEffect(() => {
    fetcthTodoList();
  },[]);

  return !loading ? (
    <>
      <div className="container mx-auto pt-10 pb-5">
        <h1 className='text-xl font-bold text-indigo-600 mb-5'>Dashboard</h1>
        <div className='block md:flex -mx-4 justify-between items-start'>
          {todoLists.map((todoList: TodoListModel) => <TodoList key={todoList.id} todolist={todoList} />)}
        </div>
      </div>
    </>
  ): (
    <div className='w-full p-20 flex justify-center items-center'>
      <Loader size={90} color='#4F46E5' />
    </div>
  )
}

export default Dashboard