import { createSlice } from "@reduxjs/toolkit";

const initialState: string = ''

const tokenSlice = createSlice({
  name : 'token',
  initialState,
  reducers: {
    getToken: (state) => {
      return state
    },
    setToken: (state,action) => {
      state = action.payload
      return state
    },
  }
});

export const { setToken } = tokenSlice.actions

export default tokenSlice;
