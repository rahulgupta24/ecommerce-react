// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import { Provider } from 'react-redux';
import { store } from './store/store'; // Import the store
import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root instance

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);