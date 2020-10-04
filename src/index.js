import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <script src="/__/firebase/7.22.0/firebase-app.js"></script>
    <script src="/__/firebase/init.js"></script>
  </React.StrictMode>,
  document.getElementById('root')
);
