import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadUser } from './reduxfeature/authSlice';

store.dispatch(loadUser()); // 🔥 REAL TIME FIX

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
