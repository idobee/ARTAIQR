import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from '../context/DataContext';
import { AuthProvider } from '../context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </BrowserRouter>
);