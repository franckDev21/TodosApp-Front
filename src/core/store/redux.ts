import { configureStore } from "@reduxjs/toolkit";
import todoListSlice from "./todoList";
import userSlice from "./user";
import tokenSlice from "./user/token";

const store = configureStore({
  reducer : {
    user : userSlice.reducer,
    token : tokenSlice.reducer,
    todoList : todoListSlice.reducer
  }
})

export default store;