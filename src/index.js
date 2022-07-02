import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import dotenv from "dotenv"
import axios from "axios"
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"
//hola
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

