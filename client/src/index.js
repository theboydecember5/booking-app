import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'
import { SearchContextProvider } from './context/SearchContext';
import { AuthContextProvider } from './context/AuthContext';

axios.defaults.baseURL = 'http://localhost:8000/api'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </AuthContextProvider>
);


