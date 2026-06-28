import React from 'react';
import ReactDOM from 'react-dom/client';
import { SoundProvider } from './context/SoundContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <SoundProvider>
        <App />
      </SoundProvider>
    </AuthProvider>
  </React.StrictMode>
);
