import React from 'react';
import ReactDOM from 'react-dom/client';
import { SoundProvider } from './context/SoundContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </React.StrictMode>
);
