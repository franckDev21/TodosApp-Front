import { createSlice } from "@reduxjs/toolkit";

const traductionSlice = createSlice({
  name : 'traduction',
  initialState: 'en',
  reducers: {
    setLang: (state,{payload}) => {
      if(payload.toLowerCase() === 'fr' || payload.toLowerCase() === 'en'){
        state = payload
        return state
      }
    },
  }
});

export const { setLang } = traductionSlice.actions

export default traductionSlice;
