import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ensure theme is set on first load
const theme = localStorage.getItem('theme');
if (!theme) {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
} else {
  document.documentElement.setAttribute('data-theme', theme);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

