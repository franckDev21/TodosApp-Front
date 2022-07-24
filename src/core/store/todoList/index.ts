import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import Todo from "../../model/todo.model";
import TodoList from "../../model/todolist.model";

const initialState: TodoList[] = []

const todoListSlice = createSlice({
  name : 'todoList',
  initialState,
  reducers: {

    fetchStoreTodoList : (state,action) => {
      state = action.payload;
      return state;
    },

    addTodo: (state,action) => {

      const todoList = state.find(element => element.id?.toString() === action.payload.id.toString());
      
      const todo: Todo = {
        id: Date.now(),
        name: action.payload.value,
        state: 'TODO',
        created_at: moment().format(),
        updated_at: moment().format(),
        todo_list_id: action.payload.id
      }

      todoList?.todos?.push(todo);

    },

    toggleTodo: (state,action) => {
      const todoList = state.find(element => element?.id?.toString() === action.payload.todo_list_id.toString());
      const todo = todoList?.todos?.find(el => el.id.toString() === action.payload.todo_id.toString());

      if(todo?.state === 'DONE'){
        todo.state = 'TODO'
      }else if(todo?.state === 'TODO'){
        todo.state = 'DONE'
      }

    },

    deleteTodo: (state,action) => {
      let todoList = state.find(element => element?.id?.toString() === action.payload.todo_list_id.toString());
      const todoFind = todoList?.todos?.find(el => el.id.toString() === action.payload.todo_id.toString());

      if(todoList){
        todoList.todos = todoList?.todos?.filter(todo => todo.id.toString() !== todoFind?.id.toString())
      }
    },

    addTodoList: (state,action) => {

      const todoList: TodoList = {
        id: action.payload.todo_list_id,
        created_at: moment().format('DD MMM YYYY'),
        updated_at: moment().format(),
        user_id: action.payload.user_id,
        todos: []
      }

      state.push(todoList);
    },

    deleteTodoList: (state,action) => {
      state = state.filter(todoList => todoList.id?.toString() !== action.payload.toString());
      return state
    },

  }
});

export const { fetchStoreTodoList, addTodo, toggleTodo, deleteTodo, addTodoList, deleteTodoList } = todoListSlice.actions

export default todoListSlice;
