import { createSlice } from "@reduxjs/toolkit";
// import { User } from "../../model/user.model";

// const initialState: User = {
//   created_at: "2022-07-22T22:43:23.000000Z",
//   email: "korey12@example.org",
//   email_verified_at: "2022-07-22T22:43:23.000000Z",
//   id: 2,
//   name: "Prof. Brando Gleichner",
//   updated_at: "2022-07-22T22:43:23.000000Z"
// }

const userSlice = createSlice({
  name : 'user',
  initialState: {},
  reducers: {
    setInfo: (state,action) => {
      state = action.payload
      return state
    },
  }
});

export const { setInfo } = userSlice.actions

export default userSlice;
