import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './index.css'
import AppRoutes from './routes/Routes';

const App = () =>{
  return (
    <div className="App">
    <AppRoutes />
  </div>
  )
};
export default App;