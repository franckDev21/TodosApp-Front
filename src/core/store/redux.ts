import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import tokenSlice from "./user/token";

const store = configureStore({
  reducer : {
    user : userSlice.reducer,
    token : tokenSlice.reducer
  }
})

export default store;