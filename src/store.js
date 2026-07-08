import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './reduxfeature/counterSlice';

import authReducer from './reduxfeature/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
