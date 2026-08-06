import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './reduxfeature/counterSlice';
import authReducer from './reduxfeature/authSlice';

import { doctorApi } from './services/doctorApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    auth: authReducer,

    [doctorApi.reducerPath]: doctorApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(doctorApi.middleware),
});
