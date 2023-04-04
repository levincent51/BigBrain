import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import LoginPage from './pages/LoginPage';

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token ? <Dashboard token={token} setToken={setToken}/> : <Welcome/>}/>
        <Route path="/login" element={
          <LoginPage setToken={setToken}/>
        } />
        <Route path="/register" element={
          <LoginPage setToken={setToken}/>
        } />
        <Route path="/*" element={
          <>
            <div>NO MATCHING ROUTE</div>
            <button onClick={() => window.location.replace('/')}>Go back</button>
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
