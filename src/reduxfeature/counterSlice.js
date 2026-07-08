import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  value: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state.value);
      state.value += 1;
    },
  },
});
export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
